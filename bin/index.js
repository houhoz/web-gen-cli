#!/usr/bin/env node

import fs from 'fs'
import { Command } from 'commander'
import chalk from 'chalk'
import inquirer from 'inquirer'
import create from './../lib/create.js'

const program = new Command()

const packageJsonData = JSON.parse(
  fs.readFileSync('package.json', 'utf8')
)

program
  .command('create <project-name>') // 增加创建指令
  .description('create a new project') // 添加描述信息
  .option('-f, --force', 'overwrite target directory if it exists') // 强制覆盖
  .action((projectName, cmd) => {
    // 处理用户输入create 指令附加的参数
    create(projectName, cmd)
  })

program
  .name('wg-cli')
  .usage(`<command> [option]`)
  .version(`wg-cli ${packageJsonData.version}`)
program.parse(process.argv)
