import { EventType } from "../../../event/event-manager.types";
import { StateManager } from "../../../state/state-manager";
import { HTMLViewElement } from "../html-view-element";
import { TagManager } from "../tag-manager";
import { Container } from "./container";

export enum ListViewDirection {
    VERTICAL = 'column',
    HORIZONTAL = 'row'
}

export type ListViewType = {
    direction?: ListViewDirection,
    builder: (data: any, index: number) => HTMLViewElement,
    stream: string,
    manager: StateManager,
    inprogress?:  () => HTMLViewElement
    init?: HTMLViewElement
};

export class ListViewListenerBuilder implements HTMLViewElement {
    constructor(
        public params: ListViewType
    ) { }

    private setEvents(element: TagManager, child: Function, type = EventType.REGULAR) {
        this.params.manager.subscribe({
            channel: this.params.stream,
            action: (data: any) => {
                element.empty();
                element.append(child(data).render());
            },
            type
        });
    }

    render(context: any): TagManager {
        const container = new Container({
            child: this.params.init ?? new Container()
        });
        const element = container.render(context);
        element.css({
            'width': '100%',
            'height': '100%'
        });
        const inprogress = this.params.inprogress ?? undefined;
        if (inprogress !== undefined) {
            this.setEvents(element, inprogress, EventType.BEFORE);
        }
        this.params.manager.subscribe({
            channel: this.params.stream, 
            action: (data: any[]) => {
                const items = data.map((data: any, index: number) => this.params.builder(data, index).render());
                element.empty();
                element.append(items);
            },
        });
        return element;
    }
}