// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }

  const webview = document.querySelector('webview')
  webview.addEventListener('dom-ready', () => {
    // webview.openDevTools()

    // webview.exec
  })
})

window.crashMe = async () => {
  const webview = document.querySelector('webview');
  const indicator = document.querySelector('.indicator')
  
  indicator.innerText = "Navigating to https://www.google.com/search?q=electron";
  await wait();
  await webview.executeJavaScript(`location.href="https://www.google.com/search?q=electron";`, true).catch(console.log);

  await wait(4000);
  indicator.innerText = "Running `history.back(-1)`";
  await wait();
  await webview.executeJavaScript(`history.back(-1);`, true).catch(console.log);
}

function wait(timeout=2000) {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      resolve(true);
    }, timeout)
  })
}

window.onloadFunc = () => {
  console.log("Calledddd");
  const webview = document.querySelector('webview')
  const indicator = document.querySelector('.indicator')
  
  const loadstart = () => {
    // indicator.innerText = ''
  }
  
  const loadstop = async () => {
    const webview = document.querySelector('webview');
    const url = await webview.executeJavaScript(`location.href`, true).catch(console.log);
    
    indicator.innerText = `Loaded: ${url}`
  }

  webview.addEventListener('did-start-loading', loadstart)
  webview.addEventListener('did-stop-loading', loadstop)
}