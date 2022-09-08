import { Gender } from "./patient.types";

export interface IPatient {
    id?: number,
    firstName: string,
    lastName: string,
    fullName: string,
    birthday: Date,
    gender: Gender
}