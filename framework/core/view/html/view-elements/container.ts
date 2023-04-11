import { Colors } from "../colors/Colors";
import { HTMLViewElement } from "../html-view-element";
import { HTMLViewElementList } from "../html-view-element-list";
import { TagManager } from "../tag-manager";


type ContainerType = {
  width?: string,
  heigth?: string,
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
    const css: any = {};
    if (this.params?.color)
      css['background-color'] = this.params.color;
    if (this.params?.child) {
      container.append(this.params.child.render());
    }
    container.css(css);
    return container;
  }
}