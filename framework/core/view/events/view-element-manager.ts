import { EventManager } from "../../event/event-manager";
import { TagManager } from "../html/tag-manager";

export class ViewElementManager {
    constructor(
        private tag: TagManager,
        private eventManager: EventManager = new EventManager() 
    ) { }

    public click(event: any) {
        this.tag.getElement().addEventListener('click', event);
    }
}
