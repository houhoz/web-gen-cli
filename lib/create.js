import path from 'node:path'
import fs from 'fs-extra'
import inquirer from 'inquirer'
import Creator from './Creator.js'
import { loading } from './util.js'

export default async function create(projectName, options) {
  // 获取当前工作目录
  const cwd = process.cwd()
  const targetDirectory = path.join(cwd, projectName)

  if (fs.existsSync(targetDirectory)) {
    if (options.force) {
      // 删除重名目录
      await fs.remove(targetDirectory)
    } else {
      let { isOverwrite } = await inquirer.prompt([
        // 返回值为promise
        {
          name: 'isOverwrite', // 与返回值对应
          type: 'list', // list 类型
          message: 'Target directory exists, Please choose an action',
          choices: [
            { name: 'Overwrite', value: true },
            { name: 'Cancel', value: false },
          ],
        },
      ])
      if (!isOverwrite) {
        console.log('Cancel')
        return
      } else {
        await loading(
          `Removing ${projectName}, please wait a minute`,
          fs.remove,
          targetDirectory
        )
      }
    }
  }

  // 创建项目
  const creator = new Creator(projectName, targetDirectory)

  creator.create()
}
