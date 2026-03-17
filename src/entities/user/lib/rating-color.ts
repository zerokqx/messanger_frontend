export const ratingColor = (rating: number, primaryColor?: string) => {
  return rating < 2.5
    ? 'red.8'
    : rating >= 4
      ? (primaryColor ?? 'blue.8')
      : rating >= 2.5
        ? 'yellow.8'
        : 'red.8';
};
