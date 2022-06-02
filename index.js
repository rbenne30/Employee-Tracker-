require('dotenv').config();
require('console.table');
const inquirer = require('inquirer')
const mysql = require('mysql2/promise')

const displayResults = ([results]) => {
  console.table(results);
}

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
          "Update an Employee",
          "Exit"
        ]
      },
    ])
    .then(({ choice }) => {
      if (choice === "Exit") {
        return true;
      }
      if (choice === "View Departments") {
        return connection
          .query(queries.getDepartments())
          .then(displayResults)
      }
      if (choice === "View Roles") {
        return connection
          .query(queries.getRoles())
          .then(displayResults)
      }
      if (choice === "View Employees") {
        return connection
          .query(queries.getEmployees())
          .then(displayResults)
      }
      if (choice === "Add a Department") {
        return inquirer
          .prompt([
            {
              name: "name",
              message: "What is the name of the department?"
            }
          ])
          .then(queries.addDepartment)
          .then(query => connection.query(...query));
      }
      if (choice === "Add a Role") {
        return connection
          .query(queries.getDepartments())
          .then(([departments]) => {
            return inquirer
              .prompt([
                {
                  type: "list",
                  name: "department_id",
                  message: "Which department is this role a part of?",
                  choices: departments.map(({ id, name }) => ({ name, value: id }))
                },
                {
                  type: "input",
                  name: "title",
                  message: "What is the title of this role?"
                },
                {
                  type: "number",
                  name: "salary",
                  message: "What is the salary of this role?"
                }
              ])
              .then(queries.addRole)
              .then((query) => connection.query(...query))
          });
      }
      if (choice === "Add an Employee") {
        return Promise.all([
          connection.query(queries.getRoles()),
          connection.query(queries.getEmployees()),
        ]).then(([[roles], [employees]]) => {
          return inquirer
            .prompt([
              {
                type: "list",
                name: "role_id",
                message: "Which role does this employee have?",
                choices: roles.map(({ id, title }) => ({ name: title, value: id }))
              },
              {
                type: "input",
                name: "first_name",
                message: "What is the title of this role?"
              },
              {
                type: "number",
                name: "last_name",
                message: "What is the salary of this role?"
              },
              {
                type: "list",
                name: "manager_id",
                message: "Which department is this role a part of?",
                choices: [
                  ...employees.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id })),
                  { name: "None", value: null }
                ]
              },
            ])
            .then(queries.addEmployee)
            .then((query) => connection.query(...query));
        })
      }
      if (choice === "Update an Employee") {
        return Promise.all([
          connection.query(queries.getRoles()),
          connection.query(queries.getEmployees()),
        ]).then(([[roles], [employees]]) => {
          return inquirer
            .prompt([
              {
                type: "list",
                name: "id",
                message: "Which role does this employee have?",
                choices: employees.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }))
              },
              {
                type: "list",
                name: "role_id",
                message: "Which role does this employee have?",
                choices: roles.map(({ id, title }) => ({ name: title, value: id }))
              },
              {
                type: "input",
                name: "first_name",
                message: "What is the title of this role?"
              },
              {
                type: "number",
                name: "last_name",
                message: "What is the salary of this role?"
              },
              {
                type: "list",
                name: "manager_id",
                message: "Which department is this role a part of?",
                choices({ id: employeeId }) {
                  return [
                    ...employees
                      .filter(({ id }) => id !== employeeId)
                      .map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id })),
                    { name: "None", value: null }
                  ]
                }
              },
            ])
            .then(queries.updateEmployee)
            .then((query) => connection.query(...query));
        },
    .then((exit) => {
      if (exit) {
        return;
      }
      return promptLoop(connection);
    })
  }

const queries = {
  getDepartments() {
    return "SELECT * FROM department";
  },
  getRoles() {
    return "SELECT * FROM role";
  },
  getEmployees() {
    return "SELECT * FROM employee";
  },
  addDepartment({ name }) {
    return ["INSERT INTO department SET ?", { name }]
  },
  addRole({ title, salary, department_id }) {
    return ["INSERT INTO role SET ?", { title, salary, department_id }]
  },
  addEmployee({ first_name, last_name, role_id, manager_id }) {
    return ["INSERT INTO role SET ?", { first_name, last_name, role_id, manager_id }]
  },
  updateEmployee({ id, first_name, last_name, role_id, manager_id }) {
    return ["UPDATE role SET ? WHERE ?", [{ first_name, last_name, role_id, manager_id }, { id }]]
  }
}

mysql
  .createConnection({
    host: process.env.DB_HOST ?? "localhost",
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
      });
  })
  .then(() => {
    console.log("Thank you for using this program");
  });