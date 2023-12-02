// import { IpcMainEvent, IpcMainInvokeEvent } from "electron";
// import { eventMap } from "./event_map";
// import { listenOn } from "./message_event";
// import { loginListener } from "./login.listener";

import { ipcMain } from "electron";
import { eventMap } from "./event_map";
import { loginEvent } from "./login.event";
import { loginListener } from "./login.listener";
import { EventMessage, MessageEventListener } from "./message_event";
import { signupEvent } from "./signup.event";
import { signupListener } from "./signup.listener";

// type EventMap = typeof eventMap;

// export const listenerMap: {[index in keyof EventMap]: (
//   e: EventMap[index]["method"] extends "invoke" ? IpcMainInvokeEvent : IpcMainEvent,
//   p: EventMap[index]["payloadType"]
// ) => EventMap[index]["responseType"] extends void ? void : Promise<EventMap[index]["responseType"]>} = {
//   'login': loginListener
// }

type EventMap = typeof eventMap;

type Tup = {[key in keyof EventMap]: [EventMap[key], EventMap[key] extends EventMessage<infer P, infer R> ? MessageEventListener<EventMap[key]> : never] }[keyof EventMap][];

const listeners: Tup = [
  [loginEvent, loginListener],
  [signupEvent, signupListener],
];

function listenOn<T extends EventMessage<any, any>>(e: T, l: MessageEventListener<T>) {
  const fun = ipcMain[{'invoke': 'handle', 'send': 'on'}[e.method] as 'handle' | 'on'];
  fun(e.channel, l);
}

export function loadListeners() {
  const map: Map<EventMap[keyof EventMap], keyof EventMap> = new Map();
  Object.keys(eventMap).forEach((key: keyof EventMap) => {
    map.set(eventMap[key], key);
  });
  for (const tup of listeners) {
    listenOn(tup[0], tup[1]);
    map.delete(tup[0]);
  }
  const keys = map.keys();
  for (let i in keys) {
    const key = keys[i];
    console.error(`${key} (${map.get(key).constructor.name}) has no handler`);
  }
}
