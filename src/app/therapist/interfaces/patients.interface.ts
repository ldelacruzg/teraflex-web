/*Respuesta de la api cuando se obtienen los pacientes de un terapista*/
export interface ApiResponseGetMyPatientsI {
    data: MyPatientsI[];
}

/*Respuesta dentro de la data*/
export interface MyPatientsI {
    id: number;
    createdAt: string;
    updatedAt: string;
    patient: MyPatientDetailI;
}

/*Respuesta dentro de patient de la interfaz anterior*/
export interface MyPatientDetailI {
    id: 9,
    firstName: string;
    lastName: string;
    docNumber: string
    phone: string;
    birthDate: string;
    description: string;
    status: boolean;
    createdBy: number;
    updatedBy: number;
    createdAt: string;
    updatedAt: string;
    role: string;
    categoryId: number;
}

/*Respuesta de la API cuando se busca un usuario por el ID*/
export interface ApiResponseGetMyPatientByIdI {
    data: MyPatientDetailByIdI;
    message: string;
}

/*Interfaz que viene dentro de data cuando se obtienen los datos de un paciente por ID*/
export interface MyPatientDetailByIdI {
    id: number;
    firstName: string;
    lastName: string;
    docNumber: string;
    phone: string;
    description: string;
    birthDate: string;
    createdAt: string;
    updatedAt: string;
    role: string;
    categoryId: number;
    categoryName: string;
    status: boolean;
}