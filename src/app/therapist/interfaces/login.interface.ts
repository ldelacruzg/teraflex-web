/*Interfaz de respuesta de la API para cuando se loguea*/
export interface ApiResponseLoginUserI{
    statusCode: number;
    message: string;
    data:{
        token: string;
        role: string;
        firstTime: boolean;
    }
}