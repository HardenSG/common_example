#!/bin/bash

# 获取当前Shell脚本的绝对路径
SCRIPT=$(readlink -f "$0")
# 获取当前Shell脚本所在目录
SCRIPT_DIR=$(dirname "$SCRIPT")

# release信息
gitHelper() {
    node $SCRIPT_DIR/gitHelper.js
}

# changelog生成器
logGenertor() {
    # npm run changelog
    node $SCRIPT_DIR/changelog.js
}

# 更新版本信息
updateVersion() {
    node $SCRIPT_DIR/updateVersion.js
}

# 发包
publisher() {
    echo "do some npm package things\n"
}

# 主逻辑
main() {
    # 创建临时文件
    echo "{}" > $SCRIPT_DIR/temp.json

    echo "===== changelog & commit ====="

    echo "1. 更新版本信息.....\n"
    updateVersion

    echo "2. 生成changelog.....\n"
    logGenertor

    echo "3. git actions\n"
    gitHelper

    echo "4. npm publish\n"
    publisher
    
    echo "release success🏅！！"

    # 删除临时文件
    rm $SCRIPT_DIR/temp.json
}

main