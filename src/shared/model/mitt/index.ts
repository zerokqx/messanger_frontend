import mitt from 'mitt';
import type { EventsEmitter } from './events.types';
export const emitter = mitt<EventsEmitter>();
