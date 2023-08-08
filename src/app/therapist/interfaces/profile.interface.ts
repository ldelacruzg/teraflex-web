/*Interfaz de respuesta de la API para cuando se obtienen los datos del perfil del terapeuta*/
export interface ApiResponseGetMyInformationI{
    statusCode: number;
    message: string;
    data: InformationTerapistDetailI;
}

export interface InformationTerapistDetailI{
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