## monorepo

monorepo方案：https://juejin.cn/post/7215886869199896637?searchId=20240217145617445F8CC9054EA8A8C64F#heading-14

操作：https://juejin.cn/post/7254369672823586873?searchId=20240217145617445F8CC9054EA8A8C64F
使用mono repo需要使用合适的包管理工具，因为需要确保包管理工具是支持mono repo的，可以选择pnpm，或者lerna + package.workspaces

对于复杂大型项目来说lerna更加适合并且可以平滑的升级生成日志
pnpm配合lerna发包：https://juejin.cn/post/7134646424083365924?searchId=202402171525478C6F5FE568B292C83D36
monorepo坑：https://juejin.cn/post/6972139870231724045?searchId=202402171525478C6F5FE568B292C83D36

