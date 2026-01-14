# 自动滚动功能使用说明（类人行为版）

## 功能概述

自动滚动功能现已升级，采用**类人行为算法**，通过随机化和智能暂停来模拟真实用户的浏览行为，大大降低被系统检测为机器人的风险。

### 核心特性

✅ **随机化滚动间隔** - 每次滚动的时间间隔都不同
✅ **随机化滚动距离** - 避免固定模式的滚动
✅ **智能阅读暂停** - 随机模拟用户停下来阅读内容
✅ **微调滚动** - 偶尔产生小幅度滚动，模拟精细调整
✅ **平滑滚动曲线** - 使用自然的滚动动画

## 与传统自动滚动的区别

| 特性 | 传统自动滚动 | 类人行为滚动 |
|------|------------|------------|
| 滚动间隔 | 固定（如每2秒） | 随机变化（1.5-3.5秒） |
| 滚动距离 | 固定（如800px） | 随机变化（480-1120px） |
| 暂停行为 | 无暂停 | 随机15%概率暂停3秒 |
| 检测风险 | ⚠️ 较高 | ✅ 较低 |

## 如何使用

### 1. 打开设置面板

点击浮动面板右上角的⚙️齿轮图标，打开设置面板。

### 2. 配置自动滚动（高级选项）

在设置面板中找到"Auto-Scroll"（自动滚动）部分，现在有以下可配置选项：

#### 基础设置

- **Enable Auto-Scroll（启用自动滚动）**: 开启/关闭自动滚动功能
- **Scroll Interval（滚动间隔）**: 基础滚动间隔（毫秒），默认 2500ms
  - 推荐范围：2000-4000ms
  - 实际间隔会根据随机性参数上下浮动
- **Scroll Distance（滚动距离）**: 基础滚动距离（像素），默认 800px
  - 推荐范围：600-1200px
  - 实际距离会根据随机性参数上下浮动

#### 类人行为设置 ⭐

- **Randomness（随机性）**: 控制行为的随机程度，默认 0.4（40%）
  - 范围：0-1
  - 0 = 无随机性（不推荐，易被检测）
  - 0.3-0.5 = 适度随机（推荐）
  - 0.6+ = 高度随机（更安全但速度较慢）

- **Pause Probability（暂停概率）**: 模拟阅读暂停的概率，默认 0.15（15%）
  - 范围：0-1
  - 0.1-0.2 = 偶尔暂停（推荐）
  - 0.3+ = 频繁暂停（最安全但最慢）

- **Pause Duration（暂停时长）**: 暂停时的持续时间，默认 3000ms
  - 推荐范围：2000-5000ms
  - 会根据随机性参数变化

- **Max Attempts（最大尝试次数）**: 无新内容时的最大尝试次数，默认 5次

### 3. 推荐配置

#### 保守型（最安全，速度慢）
```
滚动间隔: 3500ms
滚动距离: 700px
随机性: 0.5
暂停概率: 0.25
暂停时长: 4000ms
```

#### 平衡型（推荐）✅
```
滚动间隔: 2500ms
滚动距离: 800px
随机性: 0.4
暂停概率: 0.15
暂停时长: 3000ms
```

#### 激进型（速度快，风险稍高）
```
滚动间隔: 2000ms
滚动距离: 900px
随机性: 0.3
暂停概率: 0.1
暂停时长: 2000ms
```

### 4. 启动自动滚动

点击"Start"（开始）按钮或勾选"Enable Auto-Scroll"

### 5. 监控运行状态

- 状态栏会显示"Running"（运行中）或"Stopped"（已停止）
- 打开浏览器控制台可以看到详细的滚动日志（需开启Debug模式）

## 安全使用建议

### ⚠️ 降低风险的最佳实践

1. **不要长时间连续使用**
   - 建议每次使用 10-15 分钟后暂停
   - 给账户"休息"时间

2. **使用推荐的配置**
   - 保持随机性在 0.3-0.5 之间
   - 启用暂停功能（概率 > 0.1）

3. **避免异常时段**
   - 不要在深夜（凌晨 2-5 点）大量抓取
   - 模拟正常人类的使用时间

4. **定期更换参数**
   - 每周微调一次配置参数
   - 避免形成固定模式

5. **监控数据捕获**
   - 观察捕获速率是否正常
   - 如果突然没有新数据，可能触发了限流

6. **及时导出数据**
   - 收集到重要数据后立即导出
   - 不要让数据全部留在浏览器中

## 技术说明

### 随机化算法

本功能使用以下算法实现随机性：

```
实际值 = 基础值 ± (基础值 × 随机性因子)
```

例如：
- 基础间隔 2500ms，随机性 0.4
- 实际间隔范围：1500ms - 3500ms
- 每次滚动都从此范围中随机选取

### 微调滚动

10% 的概率会产生微调滚动（滚动距离 × 0.3），模拟用户精细调整浏览位置的行为。

## 注意事项

### ⚠️ 重要提醒

1. **本工具无法保证100%不被检测**
   - 任何自动化工具都有被检测的风险
   - 类人行为只是降低风险，不能完全消除

2. **Twitter 的检测机制在不断进化**
   - 如果发现异常（如频繁要求验证码），立即停止使用
   - 观察一段时间后再继续

3. **账户安全**
   - 建议在小号上先测试
   - 重要账户谨慎使用

4. **遵守 Twitter 服务条款**
   - 本工具仅用于个人数据存档
   - 不要用于商业目的或大规模爬虫

5. **法律合规**
   - 确保你有权访问和导出相关数据
   - 遵守当地数据保护法律

## 故障排除

### 滚动器启动后立即停止
- 检查页面是否已经到底部
- 尝试手动滚动一下页面
- 刷新页面后重新启动

### 滚动过于缓慢
- 降低"暂停概率"参数
- 减少"滚动间隔"（不建议低于2000ms）
- 降低"随机性"（但会增加风险）

### 收到验证码或账户受限
- 立即停止使用自动滚动
- 等待24-48小时
- 下次使用更保守的配置

---

**English Version**

# Auto-Scroll Feature Usage Guide (Human-Like Behavior)

## Overview

The auto-scroll feature has been upgraded with a **human-like behavior algorithm** that uses randomization and intelligent pausing to simulate real user browsing patterns, significantly reducing the risk of being detected as a bot.

### Core Features

✅ **Randomized scroll intervals** - Each scroll timing is different
✅ **Randomized scroll distances** - Avoids fixed scroll patterns
✅ **Intelligent reading pauses** - Randomly simulates users stopping to read content
✅ **Micro-scrolls** - Occasionally produces small scrolls to simulate fine adjustments
✅ **Smooth scroll curves** - Uses natural scrolling animations

## Comparison with Traditional Auto-Scroll

| Feature | Traditional Auto-Scroll | Human-Like Scroll |
|---------|------------------------|-------------------|
| Scroll Interval | Fixed (e.g., every 2s) | Randomized (1.5-3.5s) |
| Scroll Distance | Fixed (e.g., 800px) | Randomized (480-1120px) |
| Pause Behavior | No pauses | Random 15% chance of 3s pause |
| Detection Risk | ⚠️ Higher | ✅ Lower |

## How to Use

### 1. Open Settings Panel

Click the ⚙️ gear icon in the top right corner of the floating panel.

### 2. Configure Auto-Scroll (Advanced Options)

Find the "Auto-Scroll" section in the settings panel. Available options:

#### Basic Settings

- **Enable Auto-Scroll**: Turn auto-scroll on/off
- **Scroll Interval**: Base scroll interval in milliseconds, default 2500ms
  - Recommended range: 2000-4000ms
  - Actual interval varies based on randomness parameter
- **Scroll Distance**: Base scroll distance in pixels, default 800px
  - Recommended range: 600-1200px
  - Actual distance varies based on randomness parameter

#### Human-Like Behavior Settings ⭐

- **Randomness**: Controls degree of randomization, default 0.4 (40%)
  - Range: 0-1
  - 0 = No randomness (not recommended, easily detected)
  - 0.3-0.5 = Moderate randomness (recommended)
  - 0.6+ = High randomness (safer but slower)

- **Pause Probability**: Probability of reading pauses, default 0.15 (15%)
  - Range: 0-1
  - 0.1-0.2 = Occasional pauses (recommended)
  - 0.3+ = Frequent pauses (safest but slowest)

- **Pause Duration**: Duration of pauses, default 3000ms
  - Recommended range: 2000-5000ms
  - Varies based on randomness parameter

- **Max Attempts**: Max attempts when no new content, default 5

### 3. Recommended Configurations

#### Conservative (Safest, Slower)
```
Scroll Interval: 3500ms
Scroll Distance: 700px
Randomness: 0.5
Pause Probability: 0.25
Pause Duration: 4000ms
```

#### Balanced (Recommended) ✅
```
Scroll Interval: 2500ms
Scroll Distance: 800px
Randomness: 0.4
Pause Probability: 0.15
Pause Duration: 3000ms
```

#### Aggressive (Faster, Slightly Riskier)
```
Scroll Interval: 2000ms
Scroll Distance: 900px
Randomness: 0.3
Pause Probability: 0.1
Pause Duration: 2000ms
```

### 4. Start Auto-Scrolling

Click "Start" button or check "Enable Auto-Scroll"

### 5. Monitor Status

- Status bar shows "Running" or "Stopped"
- Open browser console for detailed logs (requires Debug mode)

## Safe Usage Guidelines

### ⚠️ Best Practices to Reduce Risk

1. **Don't use continuously for long periods**
   - Recommended: 10-15 minutes per session
   - Give your account "rest" time

2. **Use recommended configurations**
   - Keep randomness between 0.3-0.5
   - Enable pause functionality (probability > 0.1)

3. **Avoid abnormal hours**
   - Don't scrape heavily during late night (2-5 AM)
   - Simulate normal human usage times

4. **Vary parameters regularly**
   - Adjust configuration slightly each week
   - Avoid forming fixed patterns

5. **Monitor data capture**
   - Observe if capture rate is normal
   - Sudden lack of new data may indicate rate limiting

6. **Export data promptly**
   - Export important data immediately after collection
   - Don't keep all data in browser

## Technical Details

### Randomization Algorithm

The feature uses this algorithm for randomization:

```
Actual Value = Base Value ± (Base Value × Randomness Factor)
```

Example:
- Base interval 2500ms, randomness 0.4
- Actual interval range: 1500ms - 3500ms
- Each scroll randomly selects from this range

### Micro-Scrolls

10% probability of micro-scrolls (scroll distance × 0.3), simulating users making fine adjustments to viewing position.

## Important Notes

### ⚠️ Critical Warnings

1. **This tool cannot guarantee 100% undetectable**
   - Any automation tool has detection risks
   - Human-like behavior only reduces risk, cannot eliminate it

2. **Twitter's detection mechanisms constantly evolve**
   - Stop immediately if you notice anomalies (frequent CAPTCHAs)
   - Wait before continuing

3. **Account Security**
   - Test on a secondary account first
   - Use cautiously with important accounts

4. **Comply with Twitter Terms of Service**
   - This tool is for personal data archival only
   - Don't use for commercial purposes or large-scale scraping

5. **Legal Compliance**
   - Ensure you have rights to access and export the data
   - Comply with local data protection laws

## Troubleshooting

### Scroller stops immediately after starting
- Check if page is already at bottom
- Try manually scrolling the page
- Refresh page and restart

### Scrolling too slow
- Reduce "Pause Probability" parameter
- Decrease "Scroll Interval" (don't go below 2000ms)
- Lower "Randomness" (but increases risk)

### Receiving CAPTCHAs or account restrictions
- Stop using auto-scroll immediately
- Wait 24-48 hours
- Use more conservative configuration next time

