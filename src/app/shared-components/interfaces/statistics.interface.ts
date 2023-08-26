/*Interfaz de respuesta de la API para cuando se obtiene la cantidad de pacientes por rango de edades*/
export interface ApiResponseGetCircleStatistics {
    number: number;
    message: string;
    data: DetailAgePatients[]
}

/*Interfaz con el detalle de la estadística*/
export interface DetailAgePatients {
    tag: string;
    quantity: number;
    percentage: number;
}

/*Interfaz de respuesta de la API para cuando se obtiene la cantidad de tareas por categorías*/
export interface ApiResponseGetTasksByCategories{
    statusCode: number;
    message: string;
    data: DetailTasksByCategories[];
}

/*Interfaz que viene dentro de la data de la interfaz anterior*/
export interface DetailTasksByCategories{
    categoryName: string;
    totalTask: number;
}