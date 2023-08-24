/*Interfaz de respuesta de la API para cuando se cambia la contraseña*/
export interface ApiResponseChangePasswordI {
    message: string;
    error: string;
    statusCode: number;
}

/*Interfaz con el body requerido para cambiar la contraseña*/
export interface BodyChangePasswordI {
    password: string;
}

/*Interfaz de respuesta de la API para cuando se genera una nueva contraseña para un paciente*/
export interface ApiResponseGeneratedNewPassword {
    statusCode: number,
    message: string;
    data: {
        newPassword: string;
    }
}