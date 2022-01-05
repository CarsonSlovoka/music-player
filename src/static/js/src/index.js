(() => {
  const MEDIA_PATH = "media/music/"

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
      `<li>
<img class="audio-icon me-1" alt="play" src="static/img/play.svg">
<img class="audio-icon me-1" alt="stop" src="static/img/stop.svg">
<span>${name}</span><audio><source src="${url}" type="audio/${extName}"></audio>
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

  window.onload = async () => {

    initNavbar()

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
