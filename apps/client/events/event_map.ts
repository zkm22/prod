import { loginEvent } from "./login.event";
import { signupEvent } from "./signup.event";

export const eventMap = {
  'signup': signupEvent,
  'login': loginEvent,
}
