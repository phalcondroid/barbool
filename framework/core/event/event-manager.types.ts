export type EventManagerSubscribeType = {
    [eventName: string]: Function[] | undefined;
}

export enum EventType {
    REGULAR,
    BEFORE,
    AFTER
}

export type SubscribeTypeItem = {
    eventName: string;
    action: Function;
    type?: EventType;
}

export type FireTypeItem = {
    eventName: string;
    data: any,
    type?: EventType 
}

export type EventTreeType = {
    regularEvents: EventManagerSubscribeType;
    beforeEvents: EventManagerSubscribeType; 
}