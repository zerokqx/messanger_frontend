export type Concatenation<
  First extends string,
  Second extends string,
> = `${First}${Second}`;
