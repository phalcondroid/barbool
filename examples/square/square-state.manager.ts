import { StateManager } from "../../../framework/bomburjs/view/state/StateManager";

export class SquareStateManager extends StateManager {
  constructor() {
    super();
  }

  public wtfButton() {
    fetch('https://rickandmortyapi.com/api/character/17').then(data => {
      this.fire({ eventName: "anie", data });
    });
  }
}