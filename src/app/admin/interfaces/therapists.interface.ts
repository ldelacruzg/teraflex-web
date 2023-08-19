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
export interface ApiResponseRegisterTherapistI{
    statusCode: number;
    message: string;
    data: any;
}