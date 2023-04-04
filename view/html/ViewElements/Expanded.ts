import { HTMLViewElement } from "../HtmlViewElement";
import { HTMLViewElementList } from "../HtmlViewElementList";
import { TagManager } from "../TagManager";

type ExpandedType = {
  child: HTMLViewElement | HTMLViewElementList;
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
    expanded.append(this.params.child.render());
    return expanded;
  }
}