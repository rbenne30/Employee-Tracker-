require('dotenv').config()
require('console.table')
const inquirer = require('inquirer')
const mysql = require('mysql2/promise')

mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})
  .catch((err) => {
    console.error(err)
  })
  .then((connection) => {
    if (!connection) {
      return;
    }
    console.log("Connected to database");
    return promptLoop(connection)
      .then(() => {
        connection.end();
      })
      .catch((err) => {
        console.error(err)
        connection.end();
      })
  })
  .then(() => {
    console.log("Thank you for using this program");
  })

const promptLoop = (connection) => {
  return inquirer
    .prompt([
      {
        name: "choice",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View Departments",
          "View Roles",
          "View Employees",
          "Add a Department",
          "Add a role",
          "Add an Employee",
          "Update an Employee Role",
          "Exit"
        ]
      },
    ])
    .then(({choice}) => {
      if (choice === "Exit") {
        return true;
      }
      if (choice === "View Departments") {
        return connection.query("SELECT * FROM department")
          .then(displayResults)
      }
      if (choice === "View Employees") {
        return connection.query("SELECT * FROM employees")
          .then(displayResults)
      }
      if (choice === "View Roles") {
        return connection.query("SELECT * FROM Roles")
          .then(displayResults)
      }
      
    })
    .then((exit) => {
      if (!exit) {
        return promptLoop(connection);
      }
    })
}

const displayResults = ([results]) => {
  console.table(results);
}