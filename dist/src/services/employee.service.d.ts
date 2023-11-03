/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
export declare const getAllEmployeesService: () => Promise<{
    status: boolean;
    message: string;
    data: (import("mongoose").Document<unknown, {}, {
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
        _id: import("mongoose").Types.ObjectId;
    })[];
} | {
    status: boolean;
    message: any;
    data?: undefined;
}>;
