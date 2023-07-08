import { EventTreeType, EventType, FireTypeItem, SubscribeTypeItem } from "./event-manager.types";

export class EventManager {
  private eventsTree: EventTreeType = { beforeEvents: {}, regularEvents: {}};

  /**
   * 
   * @param type 
   * @param name 
   * @param action 
   */
  private setEventsByType = (type: EventType, name: string, action: Function) => {
    
  }

  /**
   * 
   * @param params 
   */
  public subscribe<ResponseType>(params: SubscribeTypeItem) {
    let eventTree = this.eventsTree.regularEvents;
    if (params.type === EventType.BEFORE) {
      eventTree = this.eventsTree.beforeEvents;
    }
    const name = params.channel;
    if (eventTree[name] === undefined) {
      eventTree[name] = [];
    }
    eventTree[name]?.push(params.action);
  }

  /**
   * 
   * @param params 
   */
  fire(params: FireTypeItem) {
    const name = params.channel;
    if (this.eventsTree.regularEvents[name] === undefined) {
      throw Error(`Don't exist events attached to '${name}'`);
    }
    let events = this.eventsTree.regularEvents[name];
    if (params.type === EventType.BEFORE) {
      events = this.eventsTree.beforeEvents[name];
    }
    if (events && events?.length > 0) {
      events.forEach(event => event(params.data));
    }
  }
}