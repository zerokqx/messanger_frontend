import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

type Importer<T extends ComponentType<any>> = () => Promise<{ default: T }>;

type LazyWithPreload<T extends ComponentType<unknown>> =
  LazyExoticComponent<T> & {
    preload: Importer<T>;
  };

export function lazyPreload<T extends ComponentType<any>>(
  importer: Importer<T>
): LazyWithPreload<T> {
  const Component = lazy(importer) as LazyWithPreload<T>;

  Component.preload = importer;

  return Component;
}
