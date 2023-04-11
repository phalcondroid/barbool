import { TagManager } from "./tag-manager";

export interface HTMLViewElement {
  render(): TagManager;
}