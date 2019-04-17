const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const inquirer = require("inquirer");
const _ = require("lodash");
const log = console.log;

const multiCaseInput = val => {
  return {
    input: val,
    titleCase:
      val.indexOf(" ") > -1
        ? _.startCase(_.toLower(val))
            .split(" ")
            .join("")
        : _.startCase(val).replace(" ", ""),
    kebabCase: _.kebabCase(val),
    camelCase: _.camelCase(val)
  };
};

const writeFile = (fileName, filePath, fileContents) => {
  fs.writeFile(filePath, fileContents, "utf8", err => {
    if (err) return console.log(chalk.bgRed(err));
    log(chalk.bgCyan(" File created ") + ` ${fileName}`);
  });
};

const replaceNames = (fileContents, fileNames) => {
  Object.keys(fileNames).map(key => {
    fileContents = fileContents.replace(
      new RegExp(`___${key}___`, "g"),
      fileNames[key]
    );
  });
  return fileContents;
};

const makeFile = (fileName, templateName, dir, componentName) => {
  const filePath = path.join(dir, fileName);
  const fileContents = fs.readFileSync(
    path.join(__dirname, `./templates/${templateName}`),
    "utf8"
  );
  const fileContentsWithVars = replaceNames(fileContents, componentName);
  writeFile(fileName, filePath, fileContentsWithVars);
};

// Ask questions
// Prompt types: [list, rawlist, expand, checkbox, confirm, input, password, editor]
const promptQuestions = [
  {
    type: "command",
    name: "componentName",
    message: "Give your component a name!"
  },
  {
    type: "list",
    name: "componentType",
    message: "What type of component do you want?",
    choices: [
      "Class based component",
      "Stateless component",
      "Connected component (depends on react-redux)"
    ]
  }
];

const cmdPrompt = () =>
  inquirer.prompt(promptQuestions).then(answers => {
    answers.componentName = multiCaseInput(answers.componentName);
    const { componentType, componentName } = answers;

    // Where to create the component folder
    let folderName = "components";
    if (componentType === "Connected component (depends on react-redux)") {
      folderName = "pages";
    }
    const newDir = path.join(
      fs.realpathSync(process.cwd()),
      `src/${folderName}/` + answers.componentName.titleCase
    );

    // Check to see if the directory doesn't exist
    if (!fs.existsSync(newDir)) {
      // Make the component directory
      fs.mkdirSync(newDir);

      // Create all the files
      const files = {
        component: `${componentName.titleCase}.js`,
        test: `${componentName.titleCase}.test.js`,
        index: "index.js",
        stories: "stories.js",
        styles: "styles.js"
      };
      const templates = {
        class: "component-class.js",
        stateless: "component-stateless.js",
        connected: "component-connected.js",
        test: "test.js",
        index: "index.js",
        stories: "stories.js",
        conStories: "stories-connected.js",
        styles: "styles.js"
      };

      // Component type
      switch (componentType) {
        case "Class based component":
          makeFile(files.component, templates.class, newDir, componentName);
          makeFile(files.stories, templates.stories, newDir, componentName);
          break;
        case "Stateless component":
          makeFile(files.component, templates.stateless, newDir, componentName);
          makeFile(files.stories, templates.stories, newDir, componentName);
          break;
        case "Connected component (depends on react-redux)":
          makeFile(files.component, templates.connected, newDir, componentName);
          makeFile(files.stories, templates.conStories, newDir, componentName);
          break;
        default:
          makeFile(files.component, templates.class, newDir, componentName);
          makeFile(files.stories, templates.stories, newDir, componentName);
          break;
      }
      makeFile(files.test, templates.test, newDir, componentName);
      makeFile(files.index, templates.index, newDir, componentName);
      makeFile(files.styles, templates.styles, newDir, componentName);
    } else {
      log(chalk.bgRed(" Directory Already Exists ") + ` -> ${newDir}`);
    }
  });
module.exports = cmdPrompt;
