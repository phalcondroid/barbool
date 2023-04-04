import { StateManager } from "../../state/StateManager"
import { HTMLViewElement } from "../HtmlViewElement";
import { Container } from "./Container";

type ListenerBuilderType = {
  listener: string,
  manager: StateManager,
  builder: Function,
  inProgress?: HTMLViewElement
};

export class StateListenerBuilder implements HTMLViewElement {

  constructor(
    private params: ListenerBuilderType
  ) { }

  render() {
    const container = new Container({
      child: this.params.inProgress ?? new Container()
    });
    const element = container.render();
    this.params.manager.subscribe({
      eventName: this.params.listener, 
      action: (data: any) => {
        element.empty();
        element.append(this.params.builder(data).render());
      }
    });
    return element;
  }
}