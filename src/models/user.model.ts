import { RowDataPacket } from "mysql2"

export default interface User extends RowDataPacket {
    user_id?: number,
    email: string,
    password: string,
    fname?: string,
    lname?: string,
    date_created?: Date,
    last_login?: Date,
    active: boolean
}