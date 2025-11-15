import {
  redirect,
  type ParsedLocation,
  type RedirectOptions,
} from '@tanstack/react-router';

type SafeRedirect = (
  redirectProp: RedirectOptions,
  location: ParsedLocation
) => void;

/**
 * @param redirectProps - Данные для redirect функции
 * @param location - Текущий маршрут
 */
export const safeRedirect: SafeRedirect = (redirectProps, location) => {
  if (location.href === redirectProps.to) return;
  throw redirect(redirectProps);
};
