import { EventMessage } from "./message_event";

export class SignupEvent extends EventMessage<{username: string, password: string}, true> {

}

export const signupEvent = new SignupEvent('invoke', 'signup');
