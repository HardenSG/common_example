const fs = require('fs')
const path = require('path')
const { countVersion, fileUtils, baseConfirmInq, baseListInq, baseInputInq, CLI_COMMON_CONFIG } = require('./utils')
const { logUtils } = require('./constant')

const monorepoName = '../' + CLI_COMMON_CONFIG.monorepoName
async function release() {
    let baseRootFilePath = '../package.json'
    const isUpdateBaseBuild = await baseConfirmInq('是否更新基建？');

    if (!isUpdateBaseBuild) {
        const repoName = await baseListInq('选择需要更新的monorepo名称', getPackagesDictList())
        baseRootFilePath = `${monorepoName}/${repoName}/package.json`
    }
    baseRootFilePath = path.resolve(__dirname, baseRootFilePath)

    const res = await packageActions(baseRootFilePath)
    if(!res) return 

    const pkg = fileUtils({
        rootFile: baseRootFilePath
    });

    const versionUpdateTactics = await chooseUpdateTactics()
    if (versionUpdateTactics) {
        pkg.version = countVersion(pkg.version, versionUpdateTactics)
        logUtils.warn('即将写入包信息... \n')
        fileUtils({
            action: 'write',
            content: JSON.stringify(pkg, null, 2),
            rootFile: baseRootFilePath
        })
        logUtils.success('写入成功，版本更新生效！')
    }
}

// 获取monorepo下面的磁盘目录
function getPackagesDictList() {
    const packagesD = path.resolve(__dirname, monorepoName)
    return fs.readdirSync(packagesD)
}


// inquirer选择版本更新策略
async function chooseUpdateTactics() {
    const options = baseListInq('版本更新策略？默认patch', ['patch', 'beta', 'lasted'])
    return options
}

/**
 * 判定目标path是否存在否则创建
 * @param {Sring} path - 文件路径
 * @param {Boolean} canCreate - 如果没有能否创建
 */
async function packageActions(path, canCreate = true) {
    const isExist = fs.existsSync(path)
    if (isExist) {
        logUtils.success('存在包信息，即将更新版本..')
        return true
    }
    if (!isExist && canCreate) {
        logUtils.warn('不存在包信息，即将创建...')
        
        const template = fileUtils({
            rootFile: './template.json'
        })

        const resLists = await baseInputInq(['（name）pack名称', '（description）pack描述', '（author）pack作者'])
        const needUpdateKList = ['name', 'description', 'author']
        needUpdateKList.forEach((k, i) => {
            template[k] = resLists[i]
        })

        fileUtils({
            action: 'write',
            rootFile: path,
            content: JSON.stringify(template, null, 2),
        })
        logUtils.success('不存在包信息，创建成功！\n')
        return true
    } else {
        logUtils.error('不存在包信息，且不创建包，即将退出...')
        return false
    }
}

release();
