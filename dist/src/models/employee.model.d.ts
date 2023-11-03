import mongoose from "mongoose";
export declare const employeeModel: mongoose.Model<{
    lastName: number;
    firstName: number;
    dateCreated: number;
    departement: number;
    phone?: number;
    adresse?: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    lastName: number;
    firstName: number;
    dateCreated: number;
    departement: number;
    phone?: number;
    adresse?: string;
}> & {
    lastName: number;
    firstName: number;
    dateCreated: number;
    departement: number;
    phone?: number;
    adresse?: string;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    lastName: number;
    firstName: number;
    dateCreated: number;
    departement: number;
    phone?: number;
    adresse?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    lastName: number;
    firstName: number;
    dateCreated: number;
    departement: number;
    phone?: number;
    adresse?: string;
}>> & mongoose.FlatRecord<{
    lastName: number;
    firstName: number;
    dateCreated: number;
    departement: number;
    phone?: number;
    adresse?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
