#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const inquirer = require('inquirer');
const copyTemplateDir = require('copy-template-dir');

const { getPackages, toPackageName } = require('../utils/packages.js');
const { createComponent } = require('../utils/templates.js');
const { smush, pascalize } = require('../utils/string.js');

const packagesDir = path.resolve(__dirname, '..', '..', 'packages', 'components');
const storiesDir = path.resolve(__dirname, '..', '..', 'packages', 'portal', 'stories', 'components');
const storiesTemplateDir = path.resolve(__dirname, 'stories-template');
const templateDir = path.resolve(__dirname, 'package-template');


const copyPackageFromTemplateDir = (source, dest, vars) => {
  return new Promise((resolve, reject) => {
    copyTemplateDir(source, dest, vars, (err, createdFiles) => {
      if (err) reject(err);
      else {
        resolve(createdFiles)
        createComponent(vars)
      };
    });
  });
};

async function main() {
  const packages = await getPackages();
  const packagesMap = packages.reduce((acc, pkg) => ({
    ...acc,
    [pkg.name]: pkg.version,
  }));

  const suggestedExternalDependencies = [];

  const suggestedDependencies = ['button', 'typography', 'card'].map(toPackageName);

  const questions = [
    {
      type: 'input',
      name: 'name',
      message: 'Component Name (kabab-case)',
      validate: name => (name.length > 0 ? true : 'invalid name'),
    },
    {
      type: 'checkbox',
      name: 'dependencies',
      message: 'Dependencies',
      choices: [...suggestedDependencies, ...suggestedExternalDependencies].map(name => ({ name })),
      filter: keys => {
        const depMap = keys.reduce((acc, name) => ({ ...acc, [name]: '*' }), {});
        return JSON.stringify(depMap);
      },
    },
  ];

  const answers = await inquirer.prompt(questions);

  const componentName = pascalize(answers.name);
  const docsID = answers.name;
  const folderName = smush(answers.name);
  const packageName = toPackageName(answers.name);

  const folderPath = path.resolve(packagesDir, folderName);
  const storiesPath = path.resolve(storiesDir, componentName);

  const vars = {
    ...answers,
    componentName,
    docsID,
    folderName,
    folderPath,
    packageName,
    storiesPath
  };

  if (fs.existsSync(folderPath)) {
    throw new Error(`folder ${folderName} already exists`);
  }

  await copyPackageFromTemplateDir(templateDir, folderPath, vars);
  await copyPackageFromTemplateDir(storiesTemplateDir, storiesPath, vars);

  return vars;
}

main()
  .then(vars => {
    console.info(`\n${vars.componentName} created at: ${vars.folderPath}\n`);
    console.info(`Next run: ${chalk.magenta('yarn bootstrap')}\n`);
  })
  .catch(console.error);
