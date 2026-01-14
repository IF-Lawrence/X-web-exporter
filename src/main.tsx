import { render } from 'preact';
import { App } from './core/app';
import extensions from './core/extensions';

import BookmarksModule from './modules/bookmarks';

import CommunityTimelineModule from './modules/community-timeline';


import HomeTimelineModule from './modules/home-timeline';
import LikesModule from './modules/likes';

import ListTimelineModule from './modules/list-timeline';

import RuntimeLogsModule from './modules/runtime-logs';
import SearchTimelineModule from './modules/search-timeline';


import UserMediaModule from './modules/user-media';
import UserTweetsModule from './modules/user-tweets';

import './index.css';





// 1. 喜欢
extensions.add(LikesModule);
// 2. 书签
extensions.add(BookmarksModule);
// 3. 用户推文
extensions.add(UserTweetsModule);
// 4. 用户媒体
extensions.add(UserMediaModule);
// 5. 搜索结果
extensions.add(SearchTimelineModule);
// 6. 列表时间线
extensions.add(ListTimelineModule);
// 7. 社群时间线
extensions.add(CommunityTimelineModule);

// Others
extensions.add(HomeTimelineModule);
extensions.add(RuntimeLogsModule);
extensions.start();

function mountApp() {
  let root = document.getElementById('twe-root');
  if (!root) {
    root = document.createElement('div');
    root.id = 'twe-root';
    document.body.append(root);
  }

  render(<App />, root);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}
