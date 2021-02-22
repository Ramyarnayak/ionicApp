export interface TealiumEvent {
    [property: string]: number | string | Array<string>;
    event_category: string;
    event_label?: string;
    event_action: string;
  }
