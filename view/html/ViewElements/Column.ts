import { HTMLViewElement } from "../HtmlViewElement";
import { HTMLViewElementList } from "../HtmlViewElementList";
import { TagManager } from "../TagManager";

export type ColumnType = {
  children: HTMLViewElement[] | HTMLViewElementList[]
};

export class Column {
  constructor(
    public data: ColumnType
  ) { }

  render(): TagManager {
    const column = new TagManager('div');
    column.css({
      'width': '100%',
      'height': '100%',
      'display': 'flex',
      'flex-direction': 'column'
    });
    column.append(this.data.children.map(item => item.render()));
    return column;
  }
}