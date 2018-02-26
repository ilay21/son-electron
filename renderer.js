const fs = require('fs');

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
let webview;
let self = this;
onload = () => {
    webview = document.querySelector('webview')
    const indicator = document.querySelector('.indicator')

    const loadEnd = () => {
        webview.openDevTools();

        fs.readFile('./interceptor-attacher.js', (err, data) => {
            if (err) {
                reject(err);
            }
            webview.getWebContents().executeJavaScript(data.toString())
        })
    }

    const loadstart = () => {
        indicator.innerText = 'loading...'
    }

    const loadstop = () => {
        indicator.innerText = ''
    }
    webview.addEventListener('did-start-loading', loadstart)
    webview.addEventListener('did-stop-loading', loadstop)

    webview.addEventListener('did-finish-load', loadEnd)


}

window.reload = () => {
    webview.reloadIgnoringCache()
}

window.back = () => {
    webview.canGoBack() && webview.goBack();
}

window.forward = () => {
    webview.canGoForward() && webview.goForward();
}