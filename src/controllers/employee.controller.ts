import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import Employee, { employeeSchema } from "../models/employee.model";
import { createEmployee, deleteEmployee, getAllEmployees, getEmployee, updateEmployee } from "../services/employee.service";

export async function getAllEmployeesHandler(req: Request, res: Response, next: NextFunction) {
    const employees = await getAllEmployees();
    // throw new Error("Server error");
    return res.json(employees);
}

export async function createEmployeeHandler(req: Request<{}, {}, Employee>, res: Response, next: NextFunction) {
    const newEmployee = req.body;

    const { error, value: validatedEmployee } = employeeSchema.validate(newEmployee);
    if (error) {
        return res.status(400).json({ error: error.message });
    }

    const createdEmployee = await createEmployee(validatedEmployee);

    return res.status(200).json(createdEmployee);
}

export async function getEmployeeHandler(req: Request<{ empId: string }>, res: Response, next: NextFunction) {
    const employee = await getEmployee(req.params.empId);

    if (!employee) {
        return res.status(404).json({ error: "Employee not found."});
    }

    return res.json(employee);
}

export async function updateEmployeeHandler(req: Request<{ empId: string }, {}, Employee>, res: Response, next: NextFunction) {
    const empId = req.params.empId;
    const employeeToUpdate = await getEmployee(empId);
    const updatedDetails = req.body;
    
    if (updatedDetails.id && empId !== updatedDetails.id) {
        return res.status(400).json( { error: "Employee IDs in request params and request body are not the same."});
    }

    if (!employeeToUpdate) {
        return res.status(404).json({ error: "Employee not found."});
    }

    const { error, value: validatedEmployee } = employeeSchema.validate(updatedDetails);
    if (error) {
        return res.status(400).json({ error: error.message });
    }

    if (areEmployeesSame(validatedEmployee, employeeToUpdate)) {
        return res.sendStatus(304);
    }
    
    const updatedEmployee = await updateEmployee(employeeToUpdate, validatedEmployee);

    return res.status(200).json(updatedEmployee);
}

function areEmployeesSame(emp1: Employee, emp2: Employee) {
    return emp1.name === emp2.name &&
        emp1.department === emp2.department &&
        emp1.salary === emp2.salary;
}

export async function deleteEmployeeHandler(req: Request<{ empId: string }>, res: Response, next: NextFunction) {
    const empId = req.params.empId;
    const employeeToDelete = await getEmployee(empId);
        
    if (!employeeToDelete) {
        return res.status(404).json({ error: "Employee not found."});
    }
    
    await deleteEmployee(employeeToDelete); 
    
    return res.sendStatus(204);
}