// import { get } from 'lodash';
// import type { Get, Paths } from 'type-fest';
// import type { object, string } from 'zod';
//
// interface DataType {
//   name: string;
//   age: number;
//   iRelation?: boolean;
//   co: {
//     dinamo: string;
//   };
//   relation?: DataType;
// }
// const data: DataType[] = [
//   {
//     age: 18,
//     name: 'Zerok',
//
//     relation: {
//       age: 18,
//       name: 'Ren4ik',
//       relation: {
//         age: 18,
//         name: 'den4ik',
//       },
//     },
//   },
// ];
//
// interface SchemaItem<
//   Item extends object,
//   Path extends Paths<Item> = Paths<Item>,
// > {
//   path: Path;
//   validation?: (value: Get<Item, Path>) => boolean;
// }
// interface MapiumRulesObject<
//   Item extends object,
//   Cwd extends Paths<Item> = Paths<Item>,
// > {
//   cwd: Cwd;
//   schema: Record<string, SchemaItem<Item>>;
//   validation?: (item: Item) => boolean;
// }
//
// class Mapium<
//   ArrayForMapium extends object[],
//   Rules extends MapiumRulesObject<ArrayForMapium[number]> = MapiumRulesObject<
//     ArrayForMapium[number]
//   >,
// > {
//   private rules: Rules;
//   constructor(rules: Rules) {
//     this.rules = rules;
//   }
//
//   map(arr: ArrayForMapium): Rules['schema'] {
//     return {} as Rules['schema'];
//   }
// }
// const mapDataType = new Mapium<DataType[]>({
//   cwd: 'co.dinamo',
//   schema: {
//     s: {
//       path: 'co',
//       validation: (d) => d,
//     },
//   },
// });

import { toNumber } from 'lodash';

console.log(toNumber('2'));
