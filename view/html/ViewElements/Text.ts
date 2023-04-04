import { HTMLViewElement } from "../HtmlViewElement";
import { TagManager } from "../TagManager";

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