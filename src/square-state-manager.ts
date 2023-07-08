import { EventType } from "../framework/core/event/event-manager.types";
import { StateManager } from "../framework/core/state/state-manager";

export class SquareStateManager extends StateManager {
  constructor() {
    super();
  }

  public async wtfButton() {
    console.log('1', 'inicianding');
    this.fire({ channel: "characters", data: {}, type: EventType.BEFORE });
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const jsonData = await response.json();
    console.log('2', jsonData);
    setTimeout(() => this.fire({ 
        channel: "characters", 
        data: jsonData.results 
      }),
      3000
    );
  }
}