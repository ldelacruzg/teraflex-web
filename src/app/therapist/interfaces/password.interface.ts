/*Interfaz de respuesta de la API para cuando se cambia la contraseña*/
export interface ApiResponseChangePasswordI{
    message: string;
    error: string;
    statusCode: number;
}

export interface BodyChangePasswordI{
    password: string;
}