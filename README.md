<p align="center">
  <a href="asset/img/site/favicon.svg">
    <img alt="music-player" src="asset/img/site/favicon.svg" width="384"/>
  </a>
</p>

<p align="left">
  <a href="https://opensource.org/licenses/MIT" title="License: MIT">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-blue.svg?style=plastic">
  </a>
</p>

# Music Player

方便您更控場，能迅速的播放指定的音樂

## USAGE

### 啟動

1. 準備一個server:
   您可以自己寫，或者下載我寫的 [go-http-server.exe](https://github.com/CarsonSlovoka/music-player/releases/tag/v0.0) (這類似python http.server)
2. 在工作路徑 [src](src/) 之下啟動server
3. 把您有興趣的音樂全部放到[media]之中。(❗尚不支持子目錄)

> 用server是為了能自動抓取本機檔案(如[media]內的音樂)

### 特色

在啟動完之後

- input的地方可以直接打上編號即可撥放該音樂
- 按下Escape終止所有正在撥放的音樂
- 支持音樂的淡入fade-in,淡出fade-out
- 您可以同時撥放很多首音樂，形成大雜燴

> 有關淡入淡出的設定請參考設定檔: [manifest.music-player.json](src/manifest.music-player.json)

[media]: src/media/music
