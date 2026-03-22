import { Command } from 'commander';

export const program = new Command();

export const optionsGuard = (opts: object) => {
  const out: {
    output?: string;
    typeOut?: string;
  } = {};
  if ('output-methods' in opts && typeof opts['output-methods'] === 'string')
    out.output = opts['output-methods'];

  if ('types' in opts && typeof opts.types === 'string')
    out.typeOut = opts.types;
  return out;
};

program
  .option(
    '-o, --output-methods <path>',
    'Путь до директории для сохранения методов',
    '.'
  )
  .option('-t, --types <path>', 'Путь для сохранения типов', '.');

program.parse()
