# 图片 API 优化说明

## 已完成的修改

### 替换的配置文件
`themes/hexo-theme-matery/_config.yml` 中的 `featureImages` 配置

### 新的图片 API 列表

#### 1. Unsplash 随机图片 API（推荐）
- **服务商**：Unsplash（国际知名免费图片网站）
- **稳定性**：⭐⭐⭐⭐⭐（非常稳定）
- **维护状态**：长期维护
- **图片质量**：高质量专业摄影作品
- **分类**：
  - `nature` - 自然风景
  - `landscape` - 风景
  - `city` - 城市
  - `architecture` - 建筑
  - `travel` - 旅行
  - `mountain` - 山脉
  - `ocean` - 海洋
  - `sky` - 天空

**API 格式**：
```
https://source.unsplash.com/random/1600x900/?{category}
```

#### 2. Picsum Photos（开源项目）
- **服务商**：Lorem Picsum（开源项目）
- **稳定性**：⭐⭐⭐⭐⭐（非常稳定）
- **维护状态**：长期维护
- **图片质量**：高质量随机图片
- **特点**：每次请求返回不同的图片

**API 格式**：
```
https://picsum.photos/1600/900?random={number}
```

#### 3. 必应每日壁纸
- **服务商**：必应搜索
- **稳定性**：⭐⭐⭐⭐（稳定）
- **维护状态**：长期维护
- **图片质量**：高质量壁纸
- **特点**：每天更新

**API 格式**：
```
https://api.dujin.org/bing/1920.php
```

## 移除的不稳定 API

以下 API 已被移除（原因：不稳定、私有链接或已失效）：

1. ❌ `http://api.btstu.cn/sjbz/?lx=meizi` - 不稳定
2. ❌ `https://api.ixiaowai.cn/gqapi/gqapi.php` - 不稳定
3. ❌ `https://babayetu-1309205424.cos.ap-shanghai.myqcloud.com/*` - 私有 CDN
4. ❌ `https://cdn.seovx.com/*` - 不稳定
5. ❌ `https://img.btstu.cn/*` - 不稳定
6. ❌ `https://api.isoyu.com/*` - 不稳定
7. ❌ `https://img.xjh.me/*` - 不稳定
8. ❌ `https://api.shanhe.kim/` - 不稳定
9. ❌ `https://v2.api-m.com/*` - 不稳定
10. ❌ `https://imgapi.cn/*` - 不稳定
11. ❌ `https://api.52vmy.cn/*` - 不稳定

## 优势对比

| API | 稳定性 | 图片质量 | 加载速度 | 长期维护 |
|-----|--------|---------|---------|---------|
| Unsplash | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ |
| Picsum | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ |
| 必应壁纸 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ |

## 使用说明

### 当前配置
配置文件已更新，包含 16 个稳定的图片 API：
- 10 个 Unsplash 分类图片
- 5 个 Picsum 随机图片
- 1 个必应每日壁纸

### 自定义分类
如果想添加更多 Unsplash 分类，可以使用以下关键词：
- `people` - 人物
- `food` - 美食
- `animals` - 动物
- `sports` - 运动
- `business` - 商务
- `technology` - 科技
- `abstract` - 抽象
- `art` - 艺术
- `fashion` - 时尚
- `music` - 音乐

**添加方法**：
```yaml
featureImages:
  - https://source.unsplash.com/random/1600x900/?people
  - https://source.unsplash.com/random/1600x900/?food
```

## 测试验证

### 本地测试
```bash
# 清理并重新构建
npm run clean
npm run build:prod

# 本地预览
npm run server
# 访问 http://localhost:4000
```

### 在线测试
部署后，检查没有特色图片的文章是否正常显示随机图片。

## 注意事项

1. **Unsplash 访问速度**：
   - 国内访问可能较慢（服务器在国外）
   - 如果速度慢，可以考虑使用 CDN 加速或增加 Picsum 的比例

2. **图片缓存**：
   - 浏览器会缓存图片，刷新页面可能看到相同图片
   - 这是正常现象，不同用户看到的图片会不同

3. **备用方案**：
   - 如果某个 API 暂时不可用，主题会自动使用列表中的下一个
   - 建议保留多个 API 以确保可用性

## 推荐配置（国内优化）

如果你的用户主要在国内，可以调整比例：

```yaml
featureImages:
  # 必应壁纸（国内访问快）
  - https://api.dujin.org/bing/1920.php
  # Picsum（速度快）
  - https://picsum.photos/1600/900?random=1
  - https://picsum.photos/1600/900?random=2
  - https://picsum.photos/1600/900?random=3
  - https://picsum.photos/1600/900?random=4
  - https://picsum.photos/1600/900?random=5
  # Unsplash（质量高但可能较慢）
  - https://source.unsplash.com/random/1600x900/?nature
  - https://source.unsplash.com/random/1600x900/?landscape
```

## 更新日志

- **2026-05-30**：优化 featureImages 配置
  - 替换为稳定的公开 API
  - 移除不稳定和私有链接
  - 添加详细说明文档
