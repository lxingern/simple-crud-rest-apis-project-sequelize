import Employee from "../models/employee.model";

export async function getAllEmployees(): Promise<Employee[]> {
    const employees = await Employee.findAll();

    return employees;
}

export async function createEmployee(newEmployee: Employee): Promise<Employee> {
    const createdEmployee = newEmployee.save();

    return createdEmployee;
}

export async function getEmployee(empId: string): Promise<Employee | null> {
    const employee = await Employee.findOne({
        where: { id: empId }
    });

    return employee;
}

export async function updateEmployee(employeeToUpdate: Employee, updatedEmployee: Employee): Promise<Employee> {
    employeeToUpdate.name = updatedEmployee.name;
    employeeToUpdate.salary = updatedEmployee.salary;
    employeeToUpdate.department = updatedEmployee.department;

    await employeeToUpdate.save();

    return employeeToUpdate;
}

export async function deleteEmployee(employeeToDelete: Employee): Promise<void> {
    await employeeToDelete.destroy();
}