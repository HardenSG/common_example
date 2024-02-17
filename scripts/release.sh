#!/bin/bash

# release信息
gitHelper() {
    node ./scripts/gitHelper.js
}

# changelog生成器
logGenertor() {
    # npm run changelog
    conventional-changelog -p angular -i CHANGELOG.md -s
}

# 更新版本信息
updateVersion() {
    node ./scripts/updateVersion.js
}

# 发包
publisher() {
    echo "do some npm package things"
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

    echo "4. npm publish"
    publisher
    
    echo "release success🏅！！"
}

main