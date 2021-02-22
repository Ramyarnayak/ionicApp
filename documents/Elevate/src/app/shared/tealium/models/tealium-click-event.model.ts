// tslint:disable:variable-name

const delimiter: string = '-';

export class TealiumClickEvent {
    event_category: string;
    event_id: string;
    event_name: string;
    event_label?: string;

    constructor(
        event_category: string,
        event_name: string,
        event_label?: string,
        prepender?: string,
        suffix?: string,
        leaveSuffixDirty?: boolean,
        event_id?: string
    ) {
        Object.assign(this, {
            event_category,
            event_name: `${event_category}${delimiter}${this.cleanTagText(event_name)}`
        });

        if (event_label) {
            this.event_label = event_label;
        }

        if (prepender) {
            this.event_category = prepender + delimiter + this.cleanTagText(event_category);
            this.event_name = this.event_category + delimiter + this.cleanTagText(event_name);
        }

        if (suffix) {
            this.event_name = `${this.event_name}${delimiter}${leaveSuffixDirty ? suffix : this.cleanTagText(suffix)}`;
        }

        if (event_id) {
            this.event_id = event_id;
        }
    }

    private cleanTagText(dirty: string): string {
        return dirty?.toLowerCase()
            .replace(/[^a-z0-9]/g, '');
    }

}
