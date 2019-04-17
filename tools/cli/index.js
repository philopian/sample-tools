const fs = require("fs");
const path = require("path");
const argv = process.argv.slice(2);
const chalk = require("chalk");

const log = console.log;
const appDirectory = fs.realpathSync(process.cwd());
const newComponent = require("./new-component");

const pathComponentsFolder = path.join(appDirectory, "src/components");
if (argv.includes("new") && argv.includes("component")) {
  if (fs.existsSync(pathComponentsFolder)){
    newComponent()
  } else {
    log(chalk.bgRed(" Missing Folder ") + ` -> ${pathComponentsFolder.replace(appDirectory, "")}`);
  }
}