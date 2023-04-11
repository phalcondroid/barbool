import { HTMLViewElement } from "../html-view-element";
import { HTMLViewElementList } from "../html-view-element-list";
import { TagManager } from "../tag-manager";

type ExpandedType = {
  child: HTMLViewElement;
  flex?: number;
}

export class Expanded implements HTMLViewElement {
  constructor(
    public params: ExpandedType 
  ) {

  }

  render(): TagManager {
    const expanded = new TagManager('div');
    const flex = this.params.flex ?? 1;
    expanded.css({
      'flex': `${flex} auto`
    });
    const element = this.params.child.render();
    element.css({
      'width': '100%',
      'height': '100%'
    });
    expanded.append(element);
    return expanded;
  }
}