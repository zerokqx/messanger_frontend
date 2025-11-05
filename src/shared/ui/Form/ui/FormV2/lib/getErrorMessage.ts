export const getErrorMessage = (error: unknown): string | undefined => {
  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as { message: unknown }).message);
  }
  return undefined;
};
