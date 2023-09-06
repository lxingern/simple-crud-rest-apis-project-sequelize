import { Table, Model, Column, PrimaryKey, DataType, CreatedAt, UpdatedAt } from "sequelize-typescript";
import Joi from "joi";

export const employeeSchema = Joi.object({
    name: Joi.string()
        .required(),
    salary: Joi.number()
        .min(1)
        .required(),
    department: Joi.string()
        .valid("HR", "PS")
        .required()
});

enum Departments {
    HR = "HR",
    PS = "PS"
}

@Table({
    tableName: "employees"
})
export default class Employee extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    id!: any;

    @Column
    name!: string;

    @Column
    salary!: number;

    @Column
    department!: Departments;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}