## 构建一套类似于当前项目的release cli scripts项目

整体逻辑可以参考scripts设计，配置化由根目录下面的release-config.js提供

### TODO:
- 后续调研下发包逻辑会增加发包脚本
  - 主要需要调研下monorepo模式下的发包逻辑，是否采用自己定义的scripts执行发包，还是使用lerna那种工具执行mono 仓库发布
- 对release-config.js增加默认模版