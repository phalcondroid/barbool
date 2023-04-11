import { TagManager } from "../tag-manager";

export class Row {
  constructor(
    public children: TagManager[]
  ) { }

  render(): TagManager {
    const property = new TagManager('div');
    property.css({
      'display': 'flex',
      'flex-direction': 'row'
    });
    property.append(this.children);
    return property;
  }
}