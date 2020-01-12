const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection
    }

    // this method allows to to see all the employees in the db
    findAllEmployees() {
        return this.connection.query(
            'SELECT employee.id, employee.first_name, employee.last_name, role.title department.name AS department, role.salary, CONCAT(manager.first_name, manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;'
        );
    }

    // Find all departments, join with employees and roles and sum up utilized department budget
    findAllDepartments() {
        return this.connection.query(
            "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
        );
    }


    // this method allows to to see all the roles in the db
    findAllRoles() {
        return this.connection.query(
            'SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;'
        )
    }

    // this method creates a new employee
    createNewEmployee(employee) {
        return this.connection.query("INSERT INTO employee SET ?", employee);
    }

    //   this method removes an existing employee
    removeEmployee(employeeId) {
        return this.connection.query(
            'DELETE FROM employee WHERE id = ?',
        )
    }

    // this method allows us to update the employee role
    updateEmployeeRole(employeeId, roleId) {
        return this.connection.query(
            'UPDATE employee SET role_id = ? WHERE id = ?',
            [roleId, employeeId]
        );
    }

    removeDepartment(departmentId) {
        return this.connection.query(
            'DELETE FROM department WHERE id =?',
            departmentId
        );
    }


  // this method creates a new role
  createNewRole(role) {
    return this.connection.query("insert INTO role SET?", role);
}

removeRole(roleId) {
    return this.connection.query("Delete FROM role Where id = ?", roleId);
}





    // this method allows to to see all the managers in the db
    // findAllManagers(employeeId) {
    //     return this.connection.query(
    //         'SELECT id, first_name, last_name FROM employee Where id !=?',
    //         employeeId
    //     );
    // }

    // this method allows to to see all the employee in the a specific Department
    // findEmployeesByDepartment(departmentId) {
    //     return this.connection.query(
    //         'SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id =?;',
    //         departmentId
    //     )
    // }








   
   
}

module.exports = new DB(connection);