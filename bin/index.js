#!/usr/bin/env node
const commander = require('commander');
const program = new commander.Command()
const toolList = require('../src/index')

toolList.forEach((item)=>{
  program.addCommand(item())
})
  
program.parseAsync(process.argv)