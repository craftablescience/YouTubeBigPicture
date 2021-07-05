// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

function createWindow () {
    // Create the browser window.
    const win = new BrowserWindow({
        minWidth: 800,
        minHeight: 600,
        fullscreen: true,
        acceptFirstMouse: true,
        webPreferences: {
            devTools: false,
            preload: path.join(__dirname, 'preload.js'),
            allowRunningInsecureContent: true,
            webviewTag: true
        }
    })

    // and load the index.html of the app.
    //win.loadFile('index.html')

    // Open the DevTools.
    //win.webContents.openDevTools()

    // Taken from StackOverflow at []
    win.maximize();

    win.loadURL("https://youtube.com/");
    win.once('ready-to-show',()=>{
        win.show()
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
