import { HTMLViewElement } from "../HtmlViewElement";
import { HTMLViewElementList } from "../HtmlViewElementList";
import { TagManager } from "../TagManager";
import { Colors } from "./colors/Colors";

type ContainerType = {
  child: HTMLViewElement | HTMLViewElementList;
  color?: Colors;
}

export class Container implements HTMLViewElement {
  constructor(
    public params?: ContainerType 
  ) {

  }

  render(): TagManager {
    const container = new TagManager('div');
    const css: any = {
      'width': '100%',
      'height': '100%'
    };
    if (this.params?.color)
      css['background-color'] = this.params.color;
    if (this.params?.child) {
      container.css(css);
      container.append(this.params.child.render());
    }
    return container;
  }
}