(() => {
  const MEDIA_PATH = "media/music/"
  const CONFIG = {loop: true}

  function initNavbar() {
    window.onscroll = function () {
      if (initNavbar.prevScrollPos > window.pageYOffset) {
        document.querySelector(`nav`).style.top = "0"
      } else {
        document.querySelector(`nav`).style.top = "-5rem"
      }
      initNavbar.prevScrollPos = window.pageYOffset
    }
  }

  initNavbar.prevScrollPos = window.pageYOffset

  function initConfigDialog(config) {
    const dialogConfig = document.querySelector(`#dialog-config`)
    const fieldsetAudio = dialogConfig.querySelector(`#fieldsetAudio`)
    const fragAudio = document.createRange().createContextualFragment(
      `<label title="是否要循環撥放">Loop<input id="checkboxLoop" type="checkbox" ${config.loop ? "checked" : ""}></label><br>`
    )
    const checkboxLoop = fragAudio.querySelector(`#checkboxLoop`)
    fieldsetAudio.append(fragAudio)

    document.querySelector(`#btn-config`).onclick = () => dialogConfig.showModal()
    const form = dialogConfig.querySelector(`form`)

    dialogConfig.querySelector(`button[class="btn-close"]`).onclick = () => dialogConfig.close()
    form.onsubmit = (e) => {
      e.preventDefault()
      config.loop = checkboxLoop.checked
      updateAllAudio()
      dialogConfig.close()
      return false
    }
  }

  function updateAllAudio() {
    document.querySelectorAll(`audio`).forEach(audio => {
      audio.loop = CONFIG.loop
    })
  }

  function setSong(mainFrag, url, name, songID) {
    const match = url.match(/.*\.(.*)/)
    if (match === null) { // 可能是資料夾
      return
    }
    const [_, extName] = match
    if (!['mp3', 'mp4', 'm4a'].includes(extName.toLowerCase())) {
      return
    }
    const frag = document.createRange().createContextualFragment(
      `<li id="song-${songID}">
<span class="me-1">${songID}</span>
<img class="audio-icon me-1" alt="play" src="static/img/play.svg">
<img class="audio-icon me-1" alt="stop" src="static/img/stop.svg">
<span>${name}</span><audio ${CONFIG.loop ? "loop" : ""}><source src="${url}" type="audio/${extName}"></audio>
</li>`
    )
    const imgRun = frag.querySelector(`img[alt="play"]`)
    const imgStop = frag.querySelector(`img[alt="stop"]`)
    const audio = frag.querySelector(`audio`)
    imgRun.onclick = () => {
      // document.que All audio.stop()
      if (audio.paused) {
        audio.play()
        imgRun.src = "static/img/pause.svg"
      } else {
        audio.pause()
        imgRun.src = "static/img/play.svg"
      }
    }
    imgStop.onclick = () => {
      audio.pause()
      imgRun.src = "static/img/play.svg"
      audio.currentTime = 0
    }
    mainFrag.appendChild(frag)
  }

  function initInputSongNumber() {
    const inputSongNumber = document.querySelector(`#inputSongNumber`)

    inputSongNumber.onkeyup = (keyboardEvent) => {
      switch (keyboardEvent.key) {
        case "Enter": {
          const songId = inputSongNumber.value
          inputSongNumber.value = "" // clear
          const liElem = document.querySelector(`#song-${songId}`)
          if (liElem === null) {
            return
          }
          const imgRun = liElem.querySelector(`img[alt="play"]`)
          const imgStop = liElem.querySelector(`img[alt="stop"]`)
          imgStop.click() // 先停止
          imgRun.click() // 再開始，就能確保跟重頭開始撥放是一樣的
        }
          break
        case "Escape":
          document.querySelectorAll(`#song-list ul li img[alt="stop"]`).forEach(imgStop => {
            imgStop.click()
          })
          break
      }
    }
  }

  window.onload = async () => {

    initNavbar()
    initConfigDialog(CONFIG)

    const ulElem = document.querySelector(`#song-list ul`)
    const response = await fetch(MEDIA_PATH)
    const dirHTML = await response.text()
    const fragDir = document.createRange().createContextualFragment(dirHTML)
    const fragUL = document.createDocumentFragment()
    fragDir.querySelectorAll(`a`).forEach((a, idx) => {
      const sourceURL = new URL(a.href)
      // a.href = MEDIA_PATH + sourceURL.pathname
      setSong(fragUL, MEDIA_PATH + sourceURL.pathname, a.innerText, idx)
    })
    ulElem.append(fragUL)

    initInputSongNumber()
  }
})()
