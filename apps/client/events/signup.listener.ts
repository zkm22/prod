import { DefaultService } from "../main/services/service";
import { MessageEventListener } from "./message_event";
import { SignupEvent } from "./signup.event";
// import { listenOn } from "./message_event";

export const signupListener: MessageEventListener<SignupEvent> = async (e, payload) => {
  const {username, password} = payload;
  await DefaultService.dbService.signup(username, password);
  return true;
};
