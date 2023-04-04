type StateManagerSubscribeType = {
  [eventName: string]: Function[];
}

type SubscribeTypeItem = {
  eventName: string;
  action: Function,
}

type FireTypeItem = {
  eventName: string;
  data: any
}

/**
 * 
 */
export class StateManager {
  private events: StateManagerSubscribeType | undefined;

  public subscribe<ResponseType>(params: SubscribeTypeItem) {
    if (this.events === undefined) {
      this.events = {};
      this.events[params.eventName] = [ params.action ];
      return;
    }
    this.events[params.eventName].push(params.action);
  }

  /**
   * 
   * @param params 
   */
  fire(params: FireTypeItem) {
    if (this.events === undefined || this.events[params.eventName] === undefined) {
      throw Error(`Don't exist events attached to '${params.eventName}'`);
    }
    const bunchOfEvents = this.events[params.eventName];
    bunchOfEvents.forEach(event => {
      event(params.data);
    });
  }
}