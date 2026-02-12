import { Paths } from 'type-fest';

interface DataType {
  key: string;
  age: number;
  rtl: {
    1: string;
    2: number;
  };
}

type Schema<Item extends object> = Record<Lowercase<string>, Paths<Item>>;

const createMap = <Arr extends object[], SchemaGeneric = Schema<Arr[number]>>(
  schema: SchemaGeneric,
  _validations: keyof SchemaGeneric
) => {
  console.log(schema);
  console.log(d);
};
createMap<DataType[]>(
  {
    d: 'age',
  } as const,
  ''
);
