import {
  IpcMainEvent,
  IpcMainInvokeEvent,
  ipcRenderer,
} from "electron";

interface MessageEventBase<
  Payload extends Record<string, any> | void = void,
  Response extends any | void = void,
> {
  method: "send" | "invoke";
  payload?: Payload;
  response?: Response;
}

interface SendMessageEvent<Payload extends Record<string, any> | void = void>
  extends MessageEventBase<Payload> {
  method: "send";
}

interface InvokeMessageType<
  Payload extends Record<string, any> | void = void,
  Response extends any | void = void,
> extends MessageEventBase<Payload, Response> {
  method: "invoke";
}

export type EventMessageType<
  Payload extends Record<string, any> | void = void,
  Response extends any | void = void,
> = SendMessageEvent<Payload> | InvokeMessageType<Payload, Response>;

export class EventMessage<
  Payload extends Record<string, any> | void = void,
  Response extends any | void = void,
> {
  payloadType?: Payload;
  responseType?: Response;

  constructor(
    readonly method: Response extends void ? "send" | "invoke" : "invoke",
    readonly channel: string,
    readonly p?: new () => Payload,
    readonly r?: new () => Response
  ) {}

  preload: () => (payload: Payload) => void | Promise<Response> = () => {
    return (payload) => ipcRenderer[this.method](this.channel, payload);
  };
}

export type MessageEventListener<
  T extends EventMessage<any, any>,
> = (
  e: T extends EventMessage<infer P, infer R> ? T["method"] extends "invoke" ? IpcMainInvokeEvent : IpcMainEvent : never,
  p: T extends EventMessage<infer P, infer R> ? T["payloadType"] : never,
) => T extends EventMessage<infer P, infer R> ? T["responseType"] extends void ? void : Promise<T["responseType"]> : never;
