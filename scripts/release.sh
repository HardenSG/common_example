#!/bin/bash

# release信息
gitHelper() {
    git config user.email "2767525216@qq.com"
    git config user.name "HardenSG"
    node ./scripts/gitHelper.js
}

# changelog生成器
logGenertor() {
    npm run changelog
}

# 更新版本信息
updateVersion() {
    node ./scripts/updateVersion.js
}

# 主逻辑
main() {
    echo "===== changelog & commit ====="

    echo "1. 更新版本信息....."
    updateVersion

    echo "2. 生成changelog....."
    logGenertor

    echo "3. git actions"
    gitHelper
    
    echo "release success🏅!!"
}

main