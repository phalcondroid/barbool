import { HTMLViewElement } from "../html-view-element";
import { TagManager } from "../tag-manager";

type TextType = {}

export class Text implements HTMLViewElement {
  constructor(
    public text: string,
    public params?: TextType 
  ) {}

  render(): TagManager {
    const text = new TagManager('span');
    text.append(this.text);
    return text;
  }
}