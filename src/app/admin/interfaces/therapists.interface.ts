/*Interfaz del body para crear un terapeuta*/
export interface RegisterTherapistI {
    docNumber: string;
    firstName: string;
    lastName: string;
    phone: string;
    description: string;
    birthDate: string;
    categoryId: number;
}

/*Interfaz de respuesta para cuando se crea un terapeuta*/
export interface ApiResponseRegisterTherapistI {
    statusCode: number;
    message: string;
    data: any;
}

/*Interfaz de respuesta de la data que obtiene el listado de los terapeutas*/
export interface ApiResponseGetTherapistsI {
    statusCode: number;
    message: string;
    data: TherapistDetailI[];
}

/*Interfaz con el detalle de los terapeutas cuando se obtiene el listado*/
export interface TherapistDetailI {
    id: number;
    firstName: string;
    lastName: string;
    docNumber: string;
    phone: string;
    birthDate: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    category: {
        id: number;
        name: string;
    }
}

/*Interfaz de respuesta para cuando se obtiene el detalle de un terapeuta por su ID*/
export interface ApiResponseGetTherapistDetailI {
    statusCode: number;
    message: string;
    data: TherapistDetailByIdI[];
}

/*Interfaz que obtiene el detalle de la información de un terapeuta*/
export interface TherapistDetailByIdI {
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

/*Interfaz de respuesta de la API para cuando se ACTIVA o DESACTIVA un terapeuta*/
export interface ApiResponseStatusTherapist {
    statusCode: number;
    message: string;
}

/*Interfaz que contiene el body para editar la información de un terapeuta*/
export interface bodyEditTherapistI {
    phone: string;
    description: string;
    birthDate: string;
    firstName: string;
    lastName: string;
}

/*Interfaz de respuesta de la API para cuando se editar un terapeuta*/
export interface ApiResponseEditTherapistI{
    statusCode: number;
    message: string;
    data: bodyResponseEditTherapistI;
}

/*Interfaz que viene dentro de la data de respuesta para cuando se edita un terapeuta*/
export interface bodyResponseEditTherapistI{
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