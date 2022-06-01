require('dotenv').config()
require('console.table')
const inquirer = require('inquirer')
const mysql = require('mysql2/promise')
const connection = require('./config/connection')
mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})
  .catch((err) => {
    console.error(err)
  })
// .then((connection) => {
//   if (!connection) {
//     return;
//   }
//   console.log("Connected to database");
//   promptLoop(connection)
//     .then(() => {
//       connection.end();
//     })
//     .catch((err) => {
//       console.error(err)
//       connection.end();
//     })
// })
// .then(() => {
//   console.log("Thank you for using this program");
// })

const promptLoop = () => {
  inquirer
    .prompt([
      {
        name: "choice",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View Departments",
          "View Role",
          "View Employee",
          "Add a Department",
          "Add a role",
          "Add an Employee",
          "Update an Employee Role",
          "Exit"
        ]
      },
    ])
    .then(({ choice }) => {
      if (choice === "Exit") {
        return true;
      }
      if (choice === "View Departments") {
        viewDepartments()
          .then(displayResults)
      }
      if (choice === "View Employee") {
        viewEmployee()
          .then(displayResults)
      }
      if (choice === "View Role") {
        viewRole()
          .then(displayResults)
      }
      if (choice === "Add a Department") {
        inquirer.prompt([
          {
            name: "name",
            message: "What is the name of the department?"
          }
        ]).then(results => {
          let department = results
          console.log(department)
          connection.query("INSERT INTO department SET ?", department)
        })
      }
      if (choice === "Add a Role") {
        addARole()
          .then(displayResults)
      }
      if (choice === "Add an Employee") {
        addAnEmployee()
          .then(displayResults)
      }
      if (choice === "Add a Department") {
        addADepartment()
          .then(displayResults)
      }
      if (choice === "Update an Employee Role") {
        updateAnEmployeeRole()
          .then(displayResults)
      }
    })
    .then((exit) => {
      if (!exit) {
        return promptLoop(connection);
      }
    })
}
function viewDepartments() {
  return connection.promise().query("SELECT * FROM department")
}
function viewEmployee() {
  return connection.promise().query("SELECT * FROM employee")
}
function viewRole() {
  return connection.promise().query("SELECT * FROM role")
}
function addARole() {
  return connection.promise().query("SELECT * FROM role")
}
function addAnEmployee() {
  return connection.promise().query("SELECT * FROM role")
}
function addADepartment() {
  return connection.promise().query("SELECT * FROM role")
}
function updateAnEmployeeRole() {
  return connection.promise().query("SELECT * FROM role")
}
const displayResults = ([results]) => {
  console.table(results);
}
promptLoop()