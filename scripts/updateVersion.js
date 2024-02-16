const inquirer = require('inquirer');  
const { countVersion, fileUtils } = require('./utils')

const pkg = fileUtils()
async function release() {
    const version = pkg.version
    const versionUpdateTactics = await chooseUpdateTactics()
    if (versionUpdateTactics) { 
        pkg.version = countVersion(version, versionUpdateTactics)
        fileUtils({
            action: 'write',
            content: JSON.stringify(pkg, null, 2)
        })
    }
}

// inquirer选择版本更新策略
async function chooseUpdateTactics() {
    const options = await inquirer.prompt([
        {
            type: 'list',
            name: 'tactics',
            message: '版本更新策略？默认patch',
            choices: ['patch', 'beta', 'next'],
            default: 'JavaScript'
        },
    ]);
    return options.tactics
}

release();