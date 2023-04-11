import { StateManager } from "../state/state-manager";
import { HTMLViewElement } from "../view/html/html-view-element";
import { TagManager } from "../view/html/tag-manager";

export abstract class BarboolComponent {
    constructor() { }
    abstract onConstruct(element: TagManager): any;
    abstract render(state: StateManager): HTMLViewElement;
}