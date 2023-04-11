import { EventType } from "../../../event/event-manager.types";
import { StateManager } from "../../../state/state-manager";
import { HTMLViewElement } from "../html-view-element";
import { TagManager } from "../tag-manager";
import { Container } from "./container";

type ListenerBuilderType = {
  stream: string,
  manager: StateManager,
  builder: Function,
  inprogress?: () => HTMLViewElement,
  init?: HTMLViewElement
};

export class StateListenerBuilder implements HTMLViewElement {

  constructor(
    private params: ListenerBuilderType
  ) { }


  private setEvents(element: TagManager, child: Function, type = EventType.REGULAR) {
    this.params.manager.subscribe({
      eventName: this.params.stream, 
      action: (data: any) => {
        console.log(`setting type: ${type}`, child, element);
        element.empty();
        element.append(child(data).render());
      },
      type
    });
  }

  render() {
    const container = new Container({
      child: this.params.init ?? new Container()
    });
    const element = container.render();
    const inprogress = this.params.inprogress ?? undefined;
    if (inprogress !== undefined) {
      this.setEvents(element, inprogress, EventType.BEFORE);
    }
    this.setEvents(element, this.params.builder);
    return element;
  }
}