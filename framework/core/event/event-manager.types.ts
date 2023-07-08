export type EventManagerSubscribeType = {
    [eventName: string]: Function[] | undefined;
}

export enum EventType {
    REGULAR,
    BEFORE,
    AFTER
}

export type SubscribeTypeItem = {
    channel: string;
    action: Function;
    type?: EventType;
}

export type FireTypeItem = {
    channel: string;
    data: any,
    type?: EventType 
}

export type EventTreeType = {
    regularEvents: EventManagerSubscribeType;
    beforeEvents: EventManagerSubscribeType; 
}