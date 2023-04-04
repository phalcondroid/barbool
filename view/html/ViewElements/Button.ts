import { HTMLViewElement } from "../HtmlViewElement";
import { HTMLViewElementList } from "../HtmlViewElementList";
import { TagManager } from "../TagManager";

type ComponentType = {
  child: HTMLViewElement;
  onPressed: Function
}

export class Button implements HTMLViewElement {
  constructor(
    public params: ComponentType 
  ) {

  }

  render(): TagManager {
    const component = new TagManager('button');
    component.class('btn btn-primary');
    component.append(this.params.child.render());
    component.click(this.params.onPressed);
    return component;
  }
}