export type LiteralFromArray<Low extends boolean = true> = Low extends true
  ? [Lowercase<string>, ...Lowercase<string>[]]
  : [Capitalize<string>, ...Capitalize<string>[]];

export type Literal<Low extends boolean = false> = Low extends true
  ? Lowercase<string>
  : Capitalize<string>;
