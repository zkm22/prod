import { DefaultService } from "../main/services/service";
import { LoginEvent, loginEvent } from "./login.event";
import { MessageEventListener } from "./message_event";
// import { listenOn } from "./message_event";

export const loginListener: MessageEventListener<LoginEvent> = async (e, payload) => {
  const {username, password} = payload;
  return await DefaultService.dbService.signup(username, password);
};
