const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connectionl
    }


/*
    This section has all the methods 
    that create department, employee, role
*/ 

//    this method creates a new department
   addDepartment(department){
    return this.connection.query('INSERT INTO department SET ?', department);
}
// this method creates a new role
   addRole(role){
    return this.connection.query("insert INTO role SET?", role);
}
// this method creates a new employee
addEmployee(employee) {
    return this.connection.query("INSERT INTO employee SET ?", employee);
  }

/*
    This section has all the methods 
    that allow us to view department, employee, role
 */ 

// this method allows to to see all the roles in the db
   findAllRoles(){
    return this.connection.query(
        'SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;'
    )
}
// this method allows to to see all the employees in the db
    findAllEmployee(){
        return this.connection.query (
            'SELECT employee.id, employee.first_name, employee.last_name, role.title department.name AS department, role.salary, CONCAT(manager.first_name, manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;'
        );
    }
// this method allows to to see all the managers in the db
    findAllManagers(employeeId){
        return this.connection.query(
            'SELECT id, first_name, last_name FROM employee Where id !=?',
            employeeId
            );
    }
// this method allows to to see all the employee in the a specific Department
    findEmployeesByDepartment(departmentId) {
        return this.connection.query(
            'SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id =?;',
        departmentId
            )
    }


// this method allows us to update the employee role
updateEmployeeRole(employeeId, roleId) {
    return this.connection.query(
        'UPDATE employee SET role_id = ? WHERE id = ?',
        [roleId, employeeId]
    );
}


    removeEmployee(employeeId){
        return this.connection.query(
            'DELETE FROM employee WHERE id = ?',
        )
    }

    
/*
    This section has all the methods 
    that delete department, employee, role
*/ 
removeDepartment(departmentId){
    return this.connection.query(
        'DELETE FROM department WHERE id =?',
        departmentId
    );
}
    removeRole(roleId) {
        return this.connection.query("Delete FROM role Where id = ?", roleId);
    }

   
   

    

    
}

module.exports = new DB(connection);