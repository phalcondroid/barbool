import { HTMLViewElement } from "../html-view-element";
import { HTMLViewElementList } from "../html-view-element-list";
import { TagManager } from "../tag-manager";

export enum ColumnDirection {
  VERTICAL = 'column',
  HORIZONTAL = 'row'
}

export type ColumnType = {
  children: HTMLViewElement[],
  direction?: ColumnDirection
};

export class Column implements HTMLViewElement {
  constructor(
    public params: ColumnType
  ) { }

  render(parent: TagManager): TagManager {
    const column = new TagManager('div');
    column.css({
      'width': '100%',
      'height': '100%',
      'display': 'flex',
      'flex-direction': this.params.direction ?? ColumnDirection.VERTICAL
    });
    column.append(this.params.children.map(item => item.render(column)));
    return column;
  }
}