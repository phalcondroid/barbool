import { HTMLViewElement } from "../html-view-element";
import { HTMLViewElementList } from "../html-view-element-list";
import { TagManager } from "../tag-manager";

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