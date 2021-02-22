import { TealiumEvent } from './tealium-event.model';

export interface UTag {
    data: {
      [property: string]: number | string;
    };
    view(data: TealiumEvent, callback?: () => void, uidArray?: string[]): void;
    link(data: TealiumEvent, callback?: () => void, uidArray?: string[]): void;
  }
