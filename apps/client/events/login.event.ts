import { User } from "database";
import { EventMessage } from "./message_event";


export class LoginEvent extends EventMessage<{username: string, password: string}, User> {}

export const loginEvent = new LoginEvent('invoke', 'login');
