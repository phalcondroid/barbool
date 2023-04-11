import { EventType } from "../framework/core/event/event-manager.types";
import { StateManager } from "../framework/core/state/state-manager";

export class SquareStateManager extends StateManager {
  constructor() {
    super();
  }

  public async wtfButton() {
    this.fire({ eventName: "characters", data: {}, type: EventType.BEFORE });
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const jsonData = await response.json();
    console.log('llega annie', jsonData);
    setTimeout(() => this.fire({ eventName: "characters", data: jsonData.results }), 3000);
  }
}