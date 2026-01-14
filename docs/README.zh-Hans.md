> [!NOTE] 
> 🎵 **Vibe Coding 项目** - 本项目由 AI 辅助开发 (Claude/Gemini)。
>
> 这是 [@prinsss](https://github.com/prinsss) 的 [twitter-web-exporter](https://github.com/prinsss/twitter-web-exporter) 的增强版 Fork，新增了**自动开始捕获**、**全局控制**等功能，并进行了稳定性改进。

<p align="center">
  <a href="https://github.com/IF-Lawrence/Orbit-Exporter">
    <img alt="orbit-exporter" src="../Orbit-Exporter.png" />
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
  <a href="https://github.com/IF-Lawrence/Orbit-Exporter/blob/main/README.md">English</a>
   | 简体中文
</p>

## 功能

- ⚡️ **自动开始捕获** - 页面加载时自动开始（默认启用）
- 🎛️ **全局捕获控制** - 直接在设置中控制
- 🚚 以 JSON/CSV/HTML 格式导出用户的推文、回复和喜欢
- 🔖 导出你的书签（没有最多 800 条的数量限制！）
- 💞 导出任意用户的关注者、粉丝列表
- 👥 导出列表成员和订阅者
- 🌪️ 导出主页时间线和列表时间线中的推文
- 🔍 导出搜索结果
- ✉️ 导出私信
- 📦 以原始尺寸批量下载推文中的图片和视频
- 🚀 无需开发者账号或 API 密钥
- 🛠️ 以油猴脚本的形式提供，所有操作均在浏览器内完成
- 💾 你的数据永远不会离开你的计算机
- 💚 完全免费开源

## 安装

1. 安装浏览器扩展 [Tampermonkey](https://www.tampermonkey.net/) 或 [Violentmonkey](https://violentmonkey.github.io/)
2. 点击 [这里](https://github.com/IF-Lawrence/Orbit-Exporter/releases/latest/download/orbit-exporter.user.js) 安装用户脚本

## 局限性

此脚本仅在 Web App (twitter.com/x.com) 上运行，在手机 App 上无效。

简单来说，**此脚本只能"看到"你在页面上能看到的内容**。如果你在页面上看不到某些数据，脚本也无法访问该数据。例如，Twitter 在个人资料页上仅显示最新的 3200 条推文，那么脚本就无法导出比这更早的推文。

网页上的数据是动态加载的，这意味着只有当数据被加载到本地之后，脚本才能访问这些数据。你需要在页面上不断向下滚动以加载更多数据。导出之前，请确保所有数据都已加载完毕。

## 常见问题

**问：你是如何获取数据的？** <br>
答：此脚本本身不会向 Twitter API 发起任何请求。它会安装一个 HTTP 网络拦截器，来捕获 Twitter Web App 发起的 GraphQL 请求的响应，然后解析响应并从中提取数据。

**问：脚本抓取不到任何数据！** <br>
答：参见 [Content-Security-Policy (CSP) Issues #19](https://github.com/IF-Lawrence/Orbit-Exporter/issues/19)。

**问：我需要申请开发者帐户吗？** <br>
答：不需要。此脚本不向 Twitter API 发送任何请求。

**问：使用脚本是否会导致封号？** <br>
答：基本不可能。此脚本中不存在任何自动操作，行为类似于你手动从网页上拷贝数据。

**问：关于隐私问题？** <br>
答：所有操作都在你的本地浏览器中完成。不会将数据发送到云端。

**问：脚本无法运行！** <br>
答：平台升级可能会导致脚本功能故障。如果遇到任何问题，请提交 [issue](https://github.com/IF-Lawrence/Orbit-Exporter/issues) 反馈。

## 致谢

本项目是 [@prinsss](https://github.com/prinsss) 的 [twitter-web-exporter](https://github.com/prinsss/twitter-web-exporter) 的 Fork 版本。感谢原作者创造了如此优秀的工具！

## 开源许可

[MIT](LICENSE)
