import { app } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import { config } from 'dotenv';
import { join } from 'path';
import { loadListeners } from '../events/listener_map';

config({
  path: join(__dirname, '../.env') // set relative path to .env file on root project
})

const isProd: boolean = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

;(async () => {
  await app.whenReady()

  loadListeners();
  // ipcMain.on('test', () => {
  //   console.log(globalStates.password);
  // });

  // signupMessage.listen();

  // testMessage.listen();

  // console.log(testMessage);

  // ipcMain.handle('setPassword', (e, password) => {
  //   globalStates.password = password;
  //   return true;
  // });

  // ipcMain.handle('createGit', (e, url: string, token: string, name: string) => {
  //   return new DBAPI(globalStates.password).createGit(url, name, token);
  // });

  // ipcMain.handle('getGitList', () => {
  //   // console.log();
  //   return new DBAPI(globalStates.password).getGitList();
  // })

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      // nodeIntegration: true,
      // sandbox: false,
    },
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    mainWindow.webContents.openDevTools();
    
    // clone();
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})


