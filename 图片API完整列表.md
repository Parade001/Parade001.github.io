# 图片 API 完整列表（更新版）

## 已配置的图片 API（23 个）

### 1. Unsplash（7 个）
**服务商**：Unsplash  
**稳定性**：⭐⭐⭐⭐⭐  
**特点**：高质量专业摄影作品，国际知名

```
https://source.unsplash.com/random/1600x900/?nature
https://source.unsplash.com/random/1600x900/?landscape
https://source.unsplash.com/random/1600x900/?city
https://source.unsplash.com/random/1600x900/?architecture
https://source.unsplash.com/random/1600x900/?travel
https://source.unsplash.com/random/1600x900/?mountain
https://source.unsplash.com/random/1600x900/?ocean
```

**可用分类**：nature, landscape, city, architecture, travel, mountain, ocean, sky, people, food, animals, sports, business, technology, abstract, art, fashion, music

---

### 2. Picsum Photos（5 个）
**服务商**：Lorem Picsum  
**稳定性**：⭐⭐⭐⭐⭐  
**特点**：开源项目，加载速度快

```
https://picsum.photos/1600/900?random=1
https://picsum.photos/1600/900?random=2
https://picsum.photos/1600/900?random=3
https://picsum.photos/1600/900?random=4
https://picsum.photos/1600/900?random=5
```

**说明**：可以通过修改 random 参数获取不同图片

---

### 3. 必应壁纸 API（3 个不同域名）
**服务商**：必应搜索  
**稳定性**：⭐⭐⭐⭐  
**特点**：每日更新的高质量壁纸

```
https://api.dujin.org/bing/1920.php
https://bing.ioliu.cn/v1/rand?w=1920&h=1080
https://api.oick.cn/random/api.php
```

---

### 4. Lorem Flickr（3 个）
**服务商**：基于 Flickr  
**稳定性**：⭐⭐⭐⭐  
**特点**：基于 Flickr 的随机图片服务

```
https://loremflickr.com/1600/900
https://loremflickr.com/1600/900/nature
https://loremflickr.com/1600/900/city
```

**可用分类**：nature, city, people, animals, food, technology, abstract

---

### 5. PlaceIMG（3 个）
**服务商**：PlaceIMG  
**稳定性**：⭐⭐⭐  
**特点**：简单的占位图片服务

```
https://placeimg.com/1600/900/nature
https://placeimg.com/1600/900/arch
https://placeimg.com/1600/900/tech
```

**可用分类**：nature, arch, tech, people, animals

---

## 备用 API（如果需要更多）

### 6. Pexels API
**需要 API Key**：是  
**稳定性**：⭐⭐⭐⭐⭐  
**特点**：高质量免费图片，需要注册

```
https://api.pexels.com/v1/curated?per_page=1
```

### 7. Pixabay API
**需要 API Key**：是  
**稳定性**：⭐⭐⭐⭐⭐  
**特点**：免费图片和视频，需要注册

```
https://pixabay.com/api/?key=YOUR_API_KEY&image_type=photo
```

### 8. 其他国内 API（稳定性未知）

```
# 360 壁纸
https://api.ixiaowai.cn/api/api.php

# 随机风景
https://api.btstu.cn/sjbz/api.php?lx=fengjing

# 随机动漫
https://api.btstu.cn/sjbz/api.php?lx=dongman

# 随机二次元
https://api.ixiaowai.cn/mcapi/mcapi.php
```

**注意**：这些 API 稳定性不确定，建议测试后再使用

---

## 推荐配置方案

### 方案 1：国际化（速度可能较慢）
```yaml
featureImages:
  # Unsplash（高质量）
  - https://source.unsplash.com/random/1600x900/?nature
  - https://source.unsplash.com/random/1600x900/?landscape
  - https://source.unsplash.com/random/1600x900/?city
  # Picsum（速度快）
  - https://picsum.photos/1600/900?random=1
  - https://picsum.photos/1600/900?random=2
  # Lorem Flickr
  - https://loremflickr.com/1600/900/nature
```

### 方案 2：国内优化（速度快）
```yaml
featureImages:
  # 必应壁纸（国内访问快）
  - https://api.dujin.org/bing/1920.php
  - https://bing.ioliu.cn/v1/rand?w=1920&h=1080
  - https://api.oick.cn/random/api.php
  # Picsum（速度快）
  - https://picsum.photos/1600/900?random=1
  - https://picsum.photos/1600/900?random=2
  - https://picsum.photos/1600/900?random=3
  # PlaceIMG
  - https://placeimg.com/1600/900/nature
  - https://placeimg.com/1600/900/arch
```

### 方案 3：平衡方案（当前配置）
混合使用国际和国内 API，确保可用性和多样性

---

## 测试 API 可用性

### 方法 1：浏览器测试
直接在浏览器中打开 API 地址，看是否能正常显示图片

### 方法 2：命令行测试
```bash
# 测试 API 是否可访问
curl -I https://source.unsplash.com/random/1600x900/?nature

# 测试响应时间
curl -o /dev/null -s -w "Time: %{time_total}s\n" https://picsum.photos/1600/900
```

### 方法 3：批量测试脚本
```bash
# 创建测试脚本
cat > test-apis.sh << 'EOF'
#!/bin/bash
apis=(
  "https://source.unsplash.com/random/1600x900/?nature"
  "https://picsum.photos/1600/900"
  "https://api.dujin.org/bing/1920.php"
  "https://loremflickr.com/1600/900"
  "https://placeimg.com/1600/900/nature"
)

for api in "${apis[@]}"; do
  echo "Testing: $api"
  curl -o /dev/null -s -w "Status: %{http_code} | Time: %{time_total}s\n" "$api"
  echo "---"
done
EOF

chmod +x test-apis.sh
./test-apis.sh
```

---

## 域名分布统计

当前配置使用了以下域名：
1. `source.unsplash.com` - Unsplash（7 个）
2. `picsum.photos` - Picsum Photos（5 个）
3. `api.dujin.org` - 必应壁纸（1 个）
4. `bing.ioliu.cn` - 必应壁纸（1 个）
5. `api.oick.cn` - 随机图片（1 个）
6. `loremflickr.com` - Lorem Flickr（3 个）
7. `placeimg.com` - PlaceIMG（3 个）

**总计**：7 个不同域名，23 个 API

---

## 注意事项

1. **Unsplash 访问速度**：国内访问可能较慢，但图片质量最高
2. **Picsum Photos**：速度快，稳定性好，推荐
3. **必应壁纸**：国内访问快，但每天只更新一次
4. **Lorem Flickr**：基于 Flickr，稳定性好
5. **PlaceIMG**：简单实用，但图片质量一般

## 建议

- 如果用户主要在国内，增加必应壁纸和 Picsum 的比例
- 如果追求图片质量，增加 Unsplash 的比例
- 建议保留多个不同域名的 API，确保可用性
- 定期测试 API 可用性，及时替换失效的 API

---

**更新日期**：2026-05-30  
**配置文件**：`themes/hexo-theme-matery/_config.yml`  
**当前 API 数量**：23 个
