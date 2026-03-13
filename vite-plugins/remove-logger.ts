import { parse } from '@babel/parser';
import traverseModule from '@babel/traverse';
import type { NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import MagicString from 'magic-string';
import type { Plugin } from 'vite';

const LOGGER_FILE_HINT = '/shared/lib/logger/logger';
const SAVE_LOGGER_MARKER = '[Save-Logger]';

const SUPPORTED_EXT_RE = /\.(ts|tsx|js|jsx)$/;
const traverse = (traverseModule as unknown as { default?: typeof traverseModule })
  .default ?? (traverseModule as unknown as typeof traverseModule);

const isUseLoggerCall = (callee: t.Expression | t.V8IntrinsicIdentifier): boolean => {
  return t.isIdentifier(callee) && callee.name === 'useLogger';
};

const isCustomLoggerCall = (
  callee: t.Expression | t.V8IntrinsicIdentifier
): boolean => {
  return (
    t.isMemberExpression(callee) &&
    !callee.computed &&
    t.isIdentifier(callee.object) &&
    callee.object.name === 'Logger'
  );
};

const removeCallSite = (
  path: NodePath<t.CallExpression>,
  source: MagicString,
  mutableState: { changed: boolean }
) => {
  const { node } = path;

  if (node.start == null || node.end == null) return;

  if (path.parentPath.isExpressionStatement()) {
    const parentNode = path.parentPath.node;
    if (parentNode.start != null && parentNode.end != null) {
      source.remove(parentNode.start, parentNode.end);
      mutableState.changed = true;
      return;
    }
  }

  source.overwrite(node.start, node.end, 'void 0');
  mutableState.changed = true;
};

const hasSaveLoggerMarkerNearNode = (node: t.Node, code: string): boolean => {
  if (node.start == null) return false;

  const from = Math.max(0, node.start - 240);
  const before = code.slice(from, node.start);
  const lines = before.split('\n');
  const lastNonEmpty = lines
    .reverse()
    .find((line) => line.trim().length > 0);

  return lastNonEmpty?.trim().includes(`//${SAVE_LOGGER_MARKER}`) ?? false;
};

const hasSaveLoggerMarkerOnPath = (
  path: NodePath<t.CallExpression>,
  code: string
): boolean => {
  const hasMarkerInLeadingComments = (node: t.Node | null | undefined): boolean => {
    if (!node || !('leadingComments' in node)) return false;
    const withComments = node as t.Node & { leadingComments?: t.Comment[] };
    return (
      withComments.leadingComments?.some((comment) =>
        comment.value.includes(SAVE_LOGGER_MARKER)
      ) ?? false
    );
  };

  if (hasMarkerInLeadingComments(path.parentPath.node)) return true;
  if (hasMarkerInLeadingComments(path.node)) return true;

  return hasSaveLoggerMarkerNearNode(path.node, code);
};

const hasFileLevelSaveMarker = (code: string): boolean => {
  const head = code.split('\n').slice(0, 20).join('\n');
  return head.includes(`//${SAVE_LOGGER_MARKER}`);
};

const stripLoggerImports = (
  ast: t.File,
  source: MagicString,
  mutableState: { changed: boolean },
  preserve: { useLogger: boolean; logger: boolean }
) => {
  traverse(ast, {
    ImportDeclaration(path) {
      const importNode = path.node;
      const removableSpecifiers = importNode.specifiers.filter((specifier) => {
        if (t.isImportSpecifier(specifier)) {
          return (
            !preserve.useLogger &&
            t.isIdentifier(specifier.imported) &&
            specifier.imported.name === 'useLogger'
          );
        }

        if (t.isImportDefaultSpecifier(specifier)) {
          return (
            !preserve.logger &&
            specifier.local.name === 'Logger' &&
            importNode.source.value.includes(LOGGER_FILE_HINT)
          );
        }

        return false;
      });

      if (removableSpecifiers.length === 0) return;

      if (removableSpecifiers.length === importNode.specifiers.length) {
        if (importNode.start != null && importNode.end != null) {
          source.remove(importNode.start, importNode.end);
          mutableState.changed = true;
        }
        return;
      }

      removableSpecifiers.forEach((specifier) => {
        if (specifier.start == null || specifier.end == null) return;

        // include a trailing comma if possible, otherwise trim previous comma.
        const nextChar = source.original[specifier.end] ?? '';
        if (nextChar === ',') {
          source.remove(specifier.start, specifier.end + 1);
        } else {
          const prevChar = source.original[specifier.start - 1] ?? '';
          if (prevChar === ',') {
            source.remove(specifier.start - 1, specifier.end);
          } else {
            source.remove(specifier.start, specifier.end);
          }
        }

        mutableState.changed = true;
      });
    },
  });
};

export function removeLoggerCallsPlugin(): Plugin {
  return {
    name: 'remove-logger-calls',
    apply: 'build',
    enforce: 'pre',

    transform(code, id) {
      if (id.includes('node_modules')) return null;
      if (!SUPPORTED_EXT_RE.test(id)) return null;
      if (!code.includes('useLogger') && !code.includes('Logger.')) return null;

      const ast = parse(code, {
        sourceType: 'module',
        sourceFilename: id,
        plugins: ['typescript', 'jsx'],
      });

      if (hasFileLevelSaveMarker(code)) return null;

      const source = new MagicString(code);
      const state = { changed: false };
      const preserve = { useLogger: false, logger: false };

      traverse(ast, {
        CallExpression(path) {
          const callee = path.node.callee;

          const isUseLogger = isUseLoggerCall(callee);
          const isLogger = isCustomLoggerCall(callee);

          if (!isUseLogger && !isLogger) {
            return;
          }

          if (hasSaveLoggerMarkerOnPath(path, code)) {
            if (isUseLogger) preserve.useLogger = true;
            if (isLogger) preserve.logger = true;
            return;
          }

          removeCallSite(path, source, state);
        },
      });

      stripLoggerImports(ast, source, state, preserve);

      if (!state.changed) {
        return null;
      }

      return {
        code: source.toString(),
        map: source.generateMap({ hires: true, source: id }),
      };
    },
  };
}
