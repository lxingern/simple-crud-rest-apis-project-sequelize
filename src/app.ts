import express, { Request, Response, NextFunction } from "express";
import employeeRouter from "./routers/employee.router";
import { Sequelize } from "sequelize-typescript";
import "dotenv/config";

const app = express();
const sequelize = new Sequelize({
    dialect: "postgres",
    database: process.env.PG_DATABASE,
    storage: ":memory:",
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    models: [__dirname + "/models"]
});

app.use(express.json());

app.use("/employee", employeeRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ error: err.message });
})

app.listen(3000, async () => {
    console.log("Listening on port 3000");
    await sequelize.authenticate();
    console.log("Connected to database");
})