interface BufferDataBase {
  id?: symbol;
}

interface ToggleBuffer extends BufferDataBase {
  type: 'toggle';
  data: {
    why: string;
    state: boolean;
  };
}

interface TextBuffer extends BufferDataBase {
  type: 'text';
  data: {
    value: string;
  };
}
interface EventBuffer extends BufferDataBase {
  type: 'event';
  data: {
    event: keyof GlobalEventHandlersEventMap;
  };
}
interface NumberBuffer extends BufferDataBase {
  type: 'number';
  data: {
    value: number;
  };
}

interface CounterBuffer extends BufferDataBase {
  type: 'counter';
  data: {
    amount: number;
  };
}
export type BufferData =
  | ToggleBuffer
  | TextBuffer
  | CounterBuffer
  | NumberBuffer
  | EventBuffer;
