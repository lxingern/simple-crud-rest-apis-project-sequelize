import { Router } from "express";
import { 
    createEmployeeHandler, 
    deleteEmployeeHandler, 
    getAllEmployeesHandler, 
    getEmployeeHandler, 
    updateEmployeeHandler 
} from "../controllers/employee.controller";

const router = Router();

router.get("/", getAllEmployeesHandler);
router.post("/", createEmployeeHandler);

router.get("/:empId", getEmployeeHandler);
router.put("/:empId", updateEmployeeHandler);
router.delete("/:empId", deleteEmployeeHandler);

// function employeeRouter(app: Express) {
//     app.route("/employee")
//         .get(getAllEmployeesHandler)
//         .post(createEmployeeHandler);

//     app.route("/employee/:empId")
//         .get(getEmployeeHandler)
//         .put(updateEmployeeHandler)
//         .delete(deleteEmployeeHandler);
// }

export default router;