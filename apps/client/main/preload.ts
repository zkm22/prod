import { contextBridge, ipcRenderer } from "electron";
import { signupEvent } from "../events/signup.event";
import { loginEvent } from "../events/login.event";
import { eventMap } from "../events/event_map";
// import { testMessage } from "../messages/message";
// import { signupMessage } from "../messages/signup";

// export const electronAPI = {
//   // test: () => ipcRenderer.send('test'),
//   setPassword: (password: string) => ipcRenderer.invoke('setPassword', password),
//   createGit: (url: string, token: string, name: string) => ipcRenderer.invoke('createGit', url, token, name),
//   getGitList: () => ipcRenderer.invoke('getGitList'),
//   test: testMessage.preload(),
//   signup: signupMessage.preload(),
// }

function gen() {
  const map = {} as {[index in keyof typeof eventMap]: typeof eventMap[index]['preload']};
  Object.keys(eventMap).forEach((key) => {
    map[key] = eventMap[key].preload();
  });
  return map;
}

export const electronAPI = gen();

contextBridge.exposeInMainWorld('electronAPI', electronAPI);
