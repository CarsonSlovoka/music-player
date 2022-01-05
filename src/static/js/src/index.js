(() => {
  const MEDIA_PATH = "media/music/"

  function setSong(mainFrag, url, name) {
    const match = url.match(/.*\.(.*)/)
    if (match === null) { // 可能是資料夾
      return
    }
    const [_, extName] = match
    if (!['mp3', 'mp4', 'm4a'].includes(extName.toLowerCase())) {
      return
    }
    const frag = document.createRange().createContextualFragment(
      `<li><img class="audio-icon" alt="play" src="static/img/play.png"><span>${name}</span><audio><source src="${url}" type="audio/${extName}"></audio></li>`
    )
    const iconElem = frag.querySelector(`img`)
    const audio = frag.querySelector(`audio`)
    iconElem.onclick = () => {
      // document.que All audio.stop()
      if (audio.paused) {
        audio.play()
        iconElem.src = "static/img/pause.png"
      } else {
        audio.pause()
        iconElem.src = "static/img/play.png"
      }
    }
    mainFrag.appendChild(frag)
  }

  window.onload = async () => {
    const ulElem = document.querySelector(`#song-list ul`)
    const response = await fetch(MEDIA_PATH)
    const dirHTML = await response.text()
    const fragDir = document.createRange().createContextualFragment(dirHTML)
    const fragUL = document.createDocumentFragment()
    fragDir.querySelectorAll(`a`).forEach(a => {
      const sourceURL = new URL(a.href)
      // a.href = MEDIA_PATH + sourceURL.pathname
      setSong(fragUL, MEDIA_PATH + sourceURL.pathname, a.innerText)
    })
    ulElem.append(fragUL)
  }
})()
