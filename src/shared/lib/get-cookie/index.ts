export const getCookie = <
  TCookies extends Record<string, string> = Record<string, string>,
  TName extends keyof TCookies & string = keyof TCookies & string,
>(
  name: TName
): TCookies[TName] | null => {
  if (typeof document === 'undefined') {
    return null;
  }

  const match = new RegExp(`(?:^|; )${name}=([^;]*)`).exec(document.cookie);
  const value = match?.[1];

  return (value ?? null) as TCookies[TName] | null;
};
