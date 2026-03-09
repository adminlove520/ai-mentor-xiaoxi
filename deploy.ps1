# Build the project
npm run build

# Navigate to dist directory
Set-Location -Path dist

# Create .nojekyll file
New-Item -ItemType File -Name ".nojekyll" -Force

# Initialize git repository
git init
git checkout -b gh-pages

# Add and commit files
git add -A
git commit -m 'deploy'

# Get origin URL from parent directory
$originUrl = git -C .. remote get-url origin

# Add remote and push
git remote add origin $originUrl
git push -f origin gh-pages

# Navigate back to project root
Set-Location -Path ..

# Clean up git directory in dist
Remove-Item -Path "dist\.git" -Recurse -Force
