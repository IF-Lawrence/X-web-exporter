# 日期范围过滤功能使用说明

## 功能概述

日期范围过滤功能允许你指定一个时间范围，只保存和捕获该时间段内的推文。这个功能特别适合：

- **精确时间段归档**：只导出特定时间范围内的推文
- **事件追踪**：捕获某个事件发生期间的推文
- **节省存储空间**：避免保存不需要的推文
- **提高效率**：当到达时间范围外的推文时，自动停止滚动

## 工作原理

### 数据过滤流程

1. **拦截 API 响应**：当 Twitter 返回推文数据时，工具会拦截这些数据
2. **检查推文时间**：每条推文的发布时间会与你设置的日期范围进行比对
3. **过滤推文**：只有在范围内的推文才会被保存到数据库
4. **自动停止**：当检测到推文超出日期范围时，自动滚动会自动停止

### 与自动滚动的配合

- 设置日期范围后，自动滚动会在到达范围外的推文时自动停止
- 这样可以避免无效滚动，节省时间和网络流量
- 你可以放心让自动滚动运行，它会在合适的时候停止

## 使用方法

### 1. 打开设置面板

点击浮动面板右上角的⚙️齿轮图标。

### 2. 找到"Date Range Filter"（日期范围过滤）部分

这个部分位于"Auto-Scroll"（自动滚动）下方。

### 3. 配置日期范围

#### 启用过滤
- 勾选"Enable Date Filter"（启用日期过滤）

#### 设置日期
- **Start Date（开始日期）**：最早想要捕获的推文日期
  - 留空表示不限制开始日期
  - 例如：`2024-01-01` 表示从 2024年1月1日 开始

- **End Date（结束日期）**：最晚想要捕获的推文日期
  - 留空表示不限制结束日期
  - 例如：`2024-12-31` 表示到 2024年12月31日 结束

#### 查看状态
- 设置完成后，会显示"Active: YYYY-MM-DD to YYYY-MM-DD"表示过滤器已激活
- 显示"Inactive"表示过滤器未激活

#### 清除日期
- 点击"Clear Dates"（清除日期）按钮可以快速清空日期设置

### 4. 开始捕获

配置完成后：
1. 浏览到想要导出的 Twitter 页面（如个人主页、书签等）
2. （可选）启动自动滚动
3. 工具会自动过滤并只保存日期范围内的推文

## 使用场景示例

### 场景 1：导出 2024 年的所有推文

```
Start Date: 2024-01-01
End Date: 2024-12-31
```

只会保存 2024 年 1 月 1 日到 2024 年 12 月 31 日之间的推文。

### 场景 2：导出最近 30 天的推文

```
Start Date: 2025-12-14  （今天减去30天）
End Date: （留空）
```

只会保存 2025 年 12 月 14 日之后的推文。

### 场景 3：导出某个活动期间的推文

假设你要导出某个会议期间的推文（2024年3月15-17日）：

```
Start Date: 2024-03-15
End Date: 2024-03-17
```

只会保存这三天的推文。

### 场景 4：导出历史推文（2023年之前）

```
Start Date: （留空）
End Date: 2022-12-31
```

只会保存 2022 年 12 月 31 日之前的推文。

## 技术细节

### 日期判断逻辑

- **Start Date（开始日期）**：从该日期的 00:00:00 开始
- **End Date（结束日期）**：到该日期的 23:59:59 结束
- 时间基于推文的发布时间（`created_at`字段）

### 自动停止机制

当启用日期过滤时：

1. **向下滚动**（查看历史推文）：
   - 推文时间会越来越早
   - 当遇到早于"Start Date"的推文时，自动停止滚动

2. **向上滚动**（查看新推文）：
   - 推文时间会越来越新
   - 当遇到晚于"End Date"的推文时，自动停止滚动

### 过滤统计

在浏览器控制台（按 F12）可以看到详细的过滤日志：

```
Date filter: 5 of 20 tweets filtered out (15 accepted)
Date filter: Tweet 2023-12-01 is before start date 2024-01-01, out-of-range signal fired
Auto-scroller stopped due to date range filter
```

## 注意事项

### ⚠️ 重要提醒

1. **推文顺序**
   - Twitter 通常按时间倒序显示推文（新的在上面）
   - 滚动到底部时，推文会越来越旧
   - 设置日期范围时要考虑滚动方向

2. **已保存的推文**
   - 日期过滤只影响新捕获的推文
   - 已经保存在数据库中的推文不会被自动删除
   - 如需清理，请使用"Clear DB"功能

3. **日期精度**
   - 只能精确到天（不能指定小时或分钟）
   - 所有时间基于推文的发布时间，不是捕获时间

4. **与其他功能的配合**
   - 日期过滤对所有模块生效（书签、用户推文、搜索等）
   - 自动滚动会自动响应日期过滤的停止信号
   - 导出数据时不会额外过滤（已保存的都会导出）

5. **性能影响**
   - 启用日期过滤对性能影响很小
   - 过滤在保存前进行，不会增加数据库负担

## 常见问题

### Q: 为什么设置了日期范围，还是捕获了范围外的推文？

A: 可能的原因：
- 这些推文是之前捕获并保存的
- 检查"Enable Date Filter"是否勾选
- 确认日期格式正确（YYYY-MM-DD）

### Q: 自动滚动没有停止，一直在滚动？

A: 检查以下几点：
- 日期范围设置是否正确
- 是否已经到达了范围外的推文
- 查看控制台日志确认是否检测到范围外推文

### Q: 能否设置更精确的时间（如具体到小时）？

A: 目前只支持到天的精度。如需更精确的过滤，可以：
1. 导出所有数据
2. 使用外部工具（如 Excel、Python）进一步过滤

### Q: 过滤后的推文可以恢复吗？

A: 不能。被过滤的推文不会被保存，无法恢复。如果不确定，建议：
1. 先不启用过滤，保存所有推文
2. 导出后再使用外部工具过滤

### Q: 日期过滤会影响导出速度吗？

A: 不会。实际上还可能加快速度，因为：
- 跳过了不需要的推文，减少数据库写入
- 自动滚动会更早停止，节省时间

## 最佳实践

### ✅ 推荐做法

1. **明确目标**：在开始前就确定需要哪个时间段的数据
2. **先测试**：先在小范围测试，确认日期设置正确
3. **配合自动滚动**：启用自动滚动可以自动化整个过程
4. **查看日志**：打开浏览器控制台，监控过滤过程
5. **及时导出**：捕获完成后立即导出数据

### ❌ 避免这样做

1. **边滚动边改日期**：会导致数据不一致
2. **范围过大**：如设置几年的范围，可能需要很长时间
3. **忘记清除日期**：切换任务时记得调整或清除日期范围

## 高级技巧

### 技巧 1：批量捕获多个时间段

如果需要捕获多个不连续的时间段：

1. 设置第一个时间范围，启动捕获
2. 完成后，导出数据
3. 清除数据库
4. 设置第二个时间范围，重复上述步骤
5. 最后合并多个导出文件

### 技巧 2：结合搜索使用

在搜索页面使用日期过滤：

1. 在 Twitter 搜索特定关键词
2. 设置日期范围过滤
3. 启动自动滚动
4. 只会保存该关键词在特定时间段的推文

### 技巧 3：监控最新推文时间

在控制台可以看到最后检查的推文时间：

```javascript
console.log(dateRangeFilter.getLastCheckedTimestamp())
// 输出：1704067200000 (毫秒时间戳)
```

---

**English Version**

# Date Range Filter Feature Usage Guide

## Overview

The date range filter allows you to specify a time period and only save/capture tweets within that range. This is especially useful for:

- **Precise Time Period Archival**: Export only tweets from a specific timeframe
- **Event Tracking**: Capture tweets during a particular event
- **Save Storage**: Avoid saving unwanted tweets
- **Improve Efficiency**: Auto-stop scrolling when reaching tweets outside the range

## How It Works

### Data Filtering Process

1. **Intercept API Response**: When Twitter returns tweet data, the tool intercepts it
2. **Check Tweet Time**: Each tweet's publish time is compared against your date range
3. **Filter Tweets**: Only tweets within the range are saved to the database
4. **Auto-Stop**: When tweets outside the range are detected, auto-scroll stops automatically

### Integration with Auto-Scroll

- After setting the date range, auto-scroll will stop when reaching out-of-range tweets
- Avoids ineffective scrolling, saving time and bandwidth
- You can let auto-scroll run confidently, it will stop at the right time

## Usage

### 1. Open Settings Panel

Click the ⚙️ gear icon in the top right corner of the floating panel.

### 2. Find "Date Range Filter" Section

Located below the "Auto-Scroll" section.

### 3. Configure Date Range

#### Enable Filter
- Check "Enable Date Filter"

#### Set Dates
- **Start Date**: Earliest tweet date you want to capture
  - Leave empty for no start date limit
  - Example: `2024-01-01` means starting from January 1, 2024

- **End Date**: Latest tweet date you want to capture
  - Leave empty for no end date limit
  - Example: `2024-12-31` means ending on December 31, 2024

#### View Status
- After setup, shows "Active: YYYY-MM-DD to YYYY-MM-DD" indicating filter is active
- Shows "Inactive" when filter is not active

#### Clear Dates
- Click "Clear Dates" button to quickly clear date settings

### 4. Start Capturing

After configuration:
1. Navigate to the Twitter page you want to export (profile, bookmarks, etc.)
2. (Optional) Start auto-scroll
3. Tool will automatically filter and save only tweets within the date range

## Usage Scenarios

### Scenario 1: Export All 2024 Tweets

```
Start Date: 2024-01-01
End Date: 2024-12-31
```

Only saves tweets between January 1 and December 31, 2024.

### Scenario 2: Export Last 30 Days

```
Start Date: 2025-12-14  (today minus 30 days)
End Date: (leave empty)
```

Only saves tweets after December 14, 2025.

### Scenario 3: Export Tweets During an Event

For a conference from March 15-17, 2024:

```
Start Date: 2024-03-15
End Date: 2024-03-17
```

Only saves tweets from these three days.

### Scenario 4: Export Historical Tweets (Before 2023)

```
Start Date: (leave empty)
End Date: 2022-12-31
```

Only saves tweets before December 31, 2022.

## Technical Details

### Date Judgment Logic

- **Start Date**: Begins at 00:00:00 of that date
- **End Date**: Ends at 23:59:59 of that date
- Time based on tweet's publish time (`created_at` field)

### Auto-Stop Mechanism

When date filter is enabled:

1. **Scrolling Down** (viewing historical tweets):
   - Tweet timestamps get older
   - Stops when encountering tweets earlier than "Start Date"

2. **Scrolling Up** (viewing recent tweets):
   - Tweet timestamps get newer
   - Stops when encountering tweets later than "End Date"

### Filter Statistics

In browser console (press F12), you can see detailed filter logs:

```
Date filter: 5 of 20 tweets filtered out (15 accepted)
Date filter: Tweet 2023-12-01 is before start date 2024-01-01, out-of-range signal fired
Auto-scroller stopped due to date range filter
```

## Important Notes

### ⚠️ Critical Warnings

1. **Tweet Order**
   - Twitter typically displays tweets in reverse chronological order (newest on top)
   - Scrolling to bottom shows progressively older tweets
   - Consider scroll direction when setting date range

2. **Already Saved Tweets**
   - Date filter only affects newly captured tweets
   - Tweets already in database won't be automatically deleted
   - Use "Clear DB" to clean up if needed

3. **Date Precision**
   - Only precise to day (cannot specify hour or minute)
   - All times based on tweet publish time, not capture time

4. **Integration with Other Features**
   - Date filter applies to all modules (bookmarks, user tweets, search, etc.)
   - Auto-scroll automatically responds to date filter stop signals
   - Export doesn't apply additional filtering (exports all saved tweets)

5. **Performance Impact**
   - Enabling date filter has minimal performance impact
   - Filtering happens before saving, doesn't burden database

## FAQ

### Q: Why are out-of-range tweets still being captured?

A: Possible reasons:
- These tweets were captured and saved previously
- Check if "Enable Date Filter" is checked
- Verify date format is correct (YYYY-MM-DD)

### Q: Auto-scroll doesn't stop and keeps scrolling?

A: Check:
- Date range settings are correct
- Whether you've reached out-of-range tweets
- Console logs to confirm out-of-range tweet detection

### Q: Can I set more precise time (e.g., specific hour)?

A: Currently only supports day precision. For more precise filtering:
1. Export all data
2. Use external tools (Excel, Python) for further filtering

### Q: Can filtered tweets be recovered?

A: No. Filtered tweets are not saved and cannot be recovered. If uncertain:
1. First disable filter, save all tweets
2. Export and then filter using external tools

### Q: Does date filtering affect export speed?

A: No. Actually might speed it up because:
- Skips unwanted tweets, reduces database writes
- Auto-scroll stops earlier, saves time

## Best Practices

### ✅ Recommended

1. **Define Goals**: Determine which time period you need before starting
2. **Test First**: Test on small range to confirm date settings are correct
3. **Use with Auto-Scroll**: Enable auto-scroll to automate the entire process
4. **Monitor Logs**: Open browser console to monitor filtering process
5. **Export Promptly**: Export data immediately after capture completes

### ❌ Avoid

1. **Changing Dates While Scrolling**: Causes data inconsistency
2. **Too Large Range**: Setting several years might take very long
3. **Forgetting to Clear Dates**: Remember to adjust or clear date range when switching tasks

## Advanced Tips

### Tip 1: Batch Capture Multiple Time Periods

For multiple non-continuous time periods:

1. Set first time range, start capture
2. After completion, export data
3. Clear database
4. Set second time range, repeat steps
5. Finally merge multiple export files

### Tip 2: Combine with Search

Use date filter on search pages:

1. Search for specific keywords on Twitter
2. Set date range filter
3. Start auto-scroll
4. Only saves tweets with that keyword in the specific time period

### Tip 3: Monitor Latest Tweet Time

In console, view last checked tweet timestamp:

```javascript
console.log(dateRangeFilter.getLastCheckedTimestamp())
// Output: 1704067200000 (millisecond timestamp)
```
