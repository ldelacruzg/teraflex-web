/*Respuesta de la api cuando se obtienen los pacientes de un terapista*/
export interface ApiResponseGetMyPatientsI {
    statusCode: number;
    message: string;
    data: MyPatientsI[];
}

/*Respuesta dentro de la data*/
export interface MyPatientsI {
    id: number; /*ID del grupo al que pertenece*/
    status: boolean; /*Indica si el paciente está vinculado o desvinculado*/
    createdAt: string;
    updatedAt: string;
    patient: MyPatientDetailI;
}

/*Respuesta dentro de patient de la interfaz anterior*/
export interface MyPatientDetailI {
    id: 9, /*ID del paciente como tal*/
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

/*Interfaz de respuesta para cuando se crea un paciente*/
export interface ApiResponseRegisterPatientI {
    data: string;
    message: string;
}

/*Interfaz requerida (body) para cuando se va a registrar un paciente*/
export interface RegisterPatientI {
    docNumber: string;
    firstName: string;
    lastName: string;
    phone: string;
    description: string;
    birthDate: string;
}

/*Interfaz con body requerido para editar un paciente*/
export interface EditMyPatientBodyI{
    phone: string;
    description: string;
    birthDate: string;
    firstName: string;
    lastName: string;
  }

/*Interfaz de respuesta para cuando se edita un usuario de tipo PACIENTE*/
export interface ApiResponseEditPatientI {
    data: EditPatientDetailI[];
    message: string;
}

/*Interfaz que viene dentro de data, la cual es la respuesta cuando se edita un paciente*/
export interface EditPatientDetailI {
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
}

/*Interfaz de respuesta de la API para cuando se obtiene el array de usuarios externos*/
export interface ApiResponseGetOutPatientsI{
    statusCode: number;
    message: string;
    data: GetOutPatientsI[];
}

/*Body que viene dentro de la data al obtener los usuarios externos*/
export interface GetOutPatientsI{
    id: number;
    firstName: string;
    lastName: string;
    docNumber: string;
    phone: string;
    description: string;
    birthDate: string;
    createdAt: string;
    updatedAt: string;
}

/*Api de respuesta para cuando se asocia un paciente al terapeuta*/
export interface ApiResponseLinkPatientI{
    message: string;
  error?: string;
  statusCode: number;
}

/*Interfaz de respuesta de la API para cuando se activa o desactiva un paciente*/
export interface ApiResponseActivateDesactivatePatientI{
    statusCode: number;
    message: string;
}

/*Interfaz para registrar un tratameinto */
export interface RegisterTreatmentI {
    patientId: number;
    title: string;
    startDate: string;
    description: string;
}

/*Interfaz de respuesta de la APi cuando se registra un tratamiento */
export interface ApiResponseRegisterTreatmentI {
    statusCode: number;
    message:    string;
    data:       ApiResponseRegisterTreatmentData;
}

export interface ApiResponseRegisterTreatmentData {
    title:       string;
    description: string;
    startDate:   Date;
    patientId:   number;
    therapistId: number;
    endDate:     null;
    updatedAt:   string;
    id:          number;
    isActive:    boolean;
    createdAt:   string;
}

/*Interfaz de respuesta de la API cuando se obtiene el detalle de un tratamiento */
export interface APIResponseDetailTreatment {
    statusCode: number;
    message:    string;
    data:       DetailTreatmentI;
}

export interface DetailTreatmentI {
    id:          number;
    title:       string;
    description: string;
    isActive:    boolean;
    startDate:   string;
    endDate:     string | null;
    patientId:   number;
    therapistId: number;
    createdAt:   string;
    updatedAt:   string;
}