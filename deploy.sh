#!/bin/bash
# ai-mentor-xiaoxi deploy 脚本 (Linux/macOS)

set -e

cd "$(dirname "$0")"

echo "Building..."
npm run build

echo "Deploying to gh-pages..."
cd dist

# 创建 .nojekyll
touch .nojekyll

# 初始化 git（如果还没有）
if [ ! -d .git ]; then
  git init
  git checkout -b gh-pages
fi

git add -A
git commit -m "deploy $(date '+%Y-%m-%d %H:%M:%S')"

# 获取 origin URL
originUrl=$(git -C .. remote get-url origin)
git remote add origin "$originUrl" 2>/dev/null || true
git remote set-url origin "$originUrl"

git push -f origin gh-pages

echo "Done!"
