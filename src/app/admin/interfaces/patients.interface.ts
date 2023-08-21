/*Interfaz de respuesta de la API para cuando se obtiene el listado de todos los pacientes*/
export interface ApiResponseGetAllPatientsI {
    statusCode: number;
    message: string;
    data: GetPatientDetailI[];
}

/*Data que viene dentro de la interfaz de respuesta al obtener todos los pacientes*/
export interface GetPatientDetailI{
    id: number;
    firstName: string;
    lastName: string;
    docNumber: string;
    phone: string;
    description: string;
    birthDate: string;
    createdAt: string;
    updatedAt: string;
    therapists: TherapistsDetailByPatientI[]
}

/*Interfaz con el detalle de los terapeutas que tiene asociados un paciente*/
export interface TherapistsDetailByPatientI{
    id: number;
    firstName: string;
    lastName: string;
    docNumber: string;
    phone: string;
}