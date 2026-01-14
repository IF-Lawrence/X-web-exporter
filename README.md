> [!NOTE] 
> 🎵 **Vibe Coding Project** - This project is developed with AI assistance (Claude/Gemini).
>
> This is an enhanced fork of [twitter-web-exporter](https://github.com/prinsss/twitter-web-exporter) by [@prinsss](https://github.com/prinsss), featuring **auto-start capture**, **global controls**, and stability improvements.

<p align="center">
  <a href="https://github.com/IF-Lawrence/Orbit-Exporter">
    <img alt="orbit-exporter" src="./Orbit-Exporter.png" />
  </a>
</p>

<p align="center">
  <a href="https://github.com/IF-Lawrence/Orbit-Exporter/releases">
    <img alt="UserScript" src="https://badgen.net/badge/userscript/available?color=green" />
  </a>
  <a href="https://github.com/IF-Lawrence/Orbit-Exporter/releases">
    <img alt="Latest Release" src="https://badgen.net/github/release/IF-Lawrence/Orbit-Exporter" />
  </a>
  <a href="https://github.com/IF-Lawrence/Orbit-Exporter/blob/main/LICENSE">
    <img alt="License" src="https://badgen.net/github/license/IF-Lawrence/Orbit-Exporter" />
  </a>
  <a href="https://github.com/IF-Lawrence/Orbit-Exporter">
    <img alt="TypeScript" src="https://badgen.net/badge/icon/typescript?icon=typescript&label" />
  </a>
</p>

<p align="center">
  English |
  <a href="https://github.com/IF-Lawrence/Orbit-Exporter/blob/main/docs/README.zh-Hans.md">简体中文</a>
</p>

## Features

- ⚡️ **Auto-start capture** on page load (Enabled by default)
- 🎛️ **Global capture control** directly from settings
- 🚚 Export tweets, replies and likes of any user as JSON/CSV/HTML
- 🔖 Export your bookmarks (without the max 800 limit!)
- 💞 Export following, followers list of any user
- 👥 Export list members and subscribers
- 🌪️ Export tweets from home timeline and list timeline
- 🔍 Export search results
- ✉️ Export direct messages
- 📦 Download images and videos from tweets in bulk at original size
- 🚀 No developer account or API key required
- 🛠️ Ship as a UserScript and everything is done in your browser
- 💾 Your data never leaves your computer
- 💚 Completely free and open-source

## Installation

1. Install the browser extension [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/)
2. Click [HERE](https://github.com/IF-Lawrence/Orbit-Exporter/releases/latest/download/orbit-exporter.user.js) to install the user script

## Limitation

The script only works on the web app (twitter.com/x.com). It does not work on the mobile app.

Basically, **the script "sees" what you see on the page**. If you can't see the data on the page, the script can't access it either. For example, Twitter displays only the latest 3200 tweets on the profile page and the script can't export tweets older than that.

Data on the web page is loaded dynamically, which means the script can't access the data until it is loaded. You need to keep scrolling down to load more data. Make sure that all data is loaded before exporting.

## FAQ

**Q. How do you get the data?** <br>
A. The script itself does not send any request to Twitter API. It installs an network interceptor to capture the response of GraphQL request that initiated by the Twitter web app. The script then parses the response and extracts data from it.

**Q. The script captures nothing!** <br>
A. See [Content-Security-Policy (CSP) Issues #19](https://github.com/IF-Lawrence/Orbit-Exporter/issues/19).

**Q. Do I need a developer account?** <br>
A. No. The script does not send any request to Twitter API.

**Q. Will my account be suspended?** <br>
A. Not likely. There is no automatic botting involved and the behavior is similar to manually copying the data from the web page.

**Q: What about privacy?** <br>
A: Everything is processed on your local browser. No data is sent to the cloud.

**Q: The script does not work!** <br>
A: A platform upgrade will possibly breaks the script's functionality. Please file an [issue](https://github.com/IF-Lawrence/Orbit-Exporter/issues) if you encountered any problem.

## Credits

This project is a fork of [twitter-web-exporter](https://github.com/prinsss/twitter-web-exporter) by [@prinsss](https://github.com/prinsss). Thanks to the original author for creating such a great tool!

## License

[MIT](LICENSE)
