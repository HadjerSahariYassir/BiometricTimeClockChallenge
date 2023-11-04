export interface EMPLOYEE_OBJECT {
    id?: string,
    lastName: string,
    firstName: string,
    department: string,
    dateCreated?: Date,
    phone: string,
    address: string
}

export interface TIMECLOCK_OBJECT {
    id?: string,
    checkIn: Date | null,
    checkOut: Date | null,
    comment: String,
    total: string | 0,
    employeeId?: string
}

export interface CHECK_PARAMS {
    comment: string,
    employeeId?: string
}