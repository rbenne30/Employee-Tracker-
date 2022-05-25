require('dotenv')
const inquirer = require('inquirer')
const mysql = require('mysql2/promise')
inquirer
  .prompt([
    {
      name: "department",
      type: "input",
      message: "What would you like to do?"
    },
    {
      name: "doing",
      type: "input",
      message: "what is the name of the department?"
    }
  ])
  .then(function (answers) {
    console.log(answers)
  })