import { Visit } from './visit'

export interface MedicalFile {
    patientId: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    gender: string;
    age: number;
    visits: Visit[];
}