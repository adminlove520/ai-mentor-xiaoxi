#!/bin/bash
# Build and deploy xiaoxi-blog to GitHub Pages

set -e

echo "=== Building ==="
npm run build

echo "=== Deploying to GitHub Pages ==="
cd dist

# Create .nojekyll
touch .nojekyll

# Initialize git
git init
git checkout -b gh-pages

# Get origin URL from parent
git remote add origin "$(git -C .. remote get-url origin)"

# Add and commit
git add -A
git commit -m "deploy $(date)"

# Push
git push -f origin gh-pages

echo "=== Done ==="
