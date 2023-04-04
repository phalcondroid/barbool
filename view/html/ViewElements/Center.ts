import { HTMLViewElement } from "../HtmlViewElement";
import { HTMLViewElementList } from "../HtmlViewElementList";
import { TagManager } from "../TagManager";
import { Colors } from "./colors/Colors";

type ComponentType = {
  child: HTMLViewElement | HTMLViewElementList;
}

export class Center implements HTMLViewElement {
  constructor(
    public params: ComponentType 
  ) {

  }

  render(): TagManager {
    const component = new TagManager('div');
    component.css({
      'width': '100%',
      'height': '100%',
      'display': 'flex',
      'justify-content': 'center',
      'align-items': 'center',
    });
    component.append(this.params.child.render());
    return component;
  }
}