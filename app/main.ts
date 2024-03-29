import {app, BrowserWindow, screen} from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import * as net from 'net';

let win: BrowserWindow | null = null;
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

function createWindow(): BrowserWindow {

  const size = screen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve),
      contextIsolation: false,
    },
  });

  if (serve) {
    const debug = require('electron-debug');
    debug();

    require('electron-reloader')(module);
    win.loadURL('http://localhost:4200');
  } else {
    // Path when running electron executable
    let pathIndex = './index.html';

    if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
       // Path when running electron in local folder
      pathIndex = '../dist/index.html';
    }

    const url = new URL(path.join('file:', __dirname, pathIndex));
    win.loadURL(url.href);
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  require('events').EventEmitter.prototype._maxListeners = 0
  process.setMaxListeners(0);
  defineHandlers()

  return win;
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () => setTimeout(createWindow, 400));

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}

function defineHandlers() {
  const client = net.createConnection({ port: 4444, host: 'localhost' }, () => {
    console.log('Connected to server!');
  });

  client.on('end', () => {
    console.log('Disconnected from server');
  });

  client.on('error', (err) => {
    console.error('Connection error', err);
  });

  let clientHash = ""
  win!.webContents.on('did-finish-load', () => {
    client.on('data', (data) => {

      let parsedData = JSON.parse(data.toString().split("#END_JSON#")[0])
      win!.webContents.send(parsedData.eventName, parsedData)

      console.log(data.toString().split("#END_JSON#")[1].trim())
      if(data.toString().split("#END_JSON#")[1].trim())
      {
        let parsedData2 = JSON.parse(data.toString().split("#END_JSON#")[1])
        win!.webContents.send(parsedData2.eventName, parsedData2)
      }

      if(parsedData.eventName == "PlayerAssignEvent") {
        clientHash = parsedData.clientHash
      }
    });  
  })

  const { ipcMain } = require('electron')
  ipcMain.on('TestEvent', (event, arg) => {
    const testData = JSON.stringify({
      'eventName': 'TestEvent',
      'avedakedavra': "harry potter real wtf??? borzoi reference?!",
      'clientHash': clientHash
    })

    client.write(testData+"\n")
    
    // event.reply('gameBoardSize', 'pong')
  })

  ipcMain.on('JoinQueueMessageModel', (event, arg) => {
    const data = JSON.stringify({
      'eventName': 'JoinQueueEvent',
      'size': arg.size,
      'type': arg.type,
      'clientHash': clientHash
    })

    client.write(data+"\n")
  })

  ipcMain.on('LeaveQueueMessageModel', (event, arg) => {
    const data = JSON.stringify({
      'eventName': 'LeaveQueueEvent',
      'clientHash': clientHash
    })

    client.write(data+"\n")
  })

  ipcMain.on('PlaceStoneMessageModel', (event, arg) => {
    console.log("SENT DATA")
    const data = JSON.stringify({
      'eventName': 'PlaceStoneEvent',
      'row': arg.x,
      'col': arg.y,
      'clientHash': clientHash
    })

    client.write(data+"\n")
  })

  ipcMain.on('ReadGameTurnFromDbEvent', (event, arg) => {
    const data = JSON.stringify({
      'eventName': 'ReadGameTurnFromDbEvent',
      'clientHash': clientHash,
      'gameHash': arg.gameHash,
      'turnNumber': arg.turnNumber
    })

    client.write(data+"\n")
  })

  ipcMain.on('PassMessageModel', (event, arg) => {
    const data = JSON.stringify({
      'eventName': 'PlayerPassEvent',
      'clientHash': clientHash,
      'pass': arg.pass
    })

    client.write(data+"\n")
  })

  ipcMain.on('GiveUpMessageModel', (event, arg) => {
    const data = JSON.stringify({
      'eventName': 'PlayerGiveUpEvent',
      'clientHash': clientHash,
      'giveUp': arg.giveUp
    })

    client.write(data+"\n")
  })
}