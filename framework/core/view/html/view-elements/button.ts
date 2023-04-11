import { ViewElementManager } from "../../events/view-element-manager";
import { HTMLViewElement } from "../html-view-element";
import { TagManager } from "../tag-manager";

type ListeneableComponentType = {
  child: HTMLViewElement;
  onPressed: Function,
  css?: any
}

export class Button implements HTMLViewElement {
  constructor(
    public params: ListeneableComponentType 
  ) { }

  render(): TagManager {
    const component = new TagManager('button');
    const eventManager = new ViewElementManager(component);
    component.append(this.params.child.render());
    eventManager.click(this.params.onPressed);
    component.class(this.params.css ?? '');
    return component;
  }
}