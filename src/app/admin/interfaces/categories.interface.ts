/*Interfaz de respuesta de la API para cuando spe obtiene el listado de todas las categorías*/
export interface ApiResponseCategoriesI {
    statusCode: number;
    message: string;
    data: GetCategoryI[];
}

/*Data qur viene dentro de la interfaz de repsuesta de la API para cuando se crea una nueva categoría*/
export interface GetCategoryI {
    id: 3,
    name: string;
    description: string;
    status: boolean;
    createdById: number;
    updatedById: number;
    createdAt: Date;
    updatedAt: Date;
}

/*Interfaz con el body requerido para crear una nueva categoría*/
export interface bodyCreateCategoryI {
    name: string;
    status: boolean;
    description: string;
}

/*Interfaz de respuesta de la API para cuando se crea una nueva categoría*/
export interface ApiResponseCreateCategoryI {
    statusCode: number;
    message: string;
    data: responseCategoryCreatedI;
}

/*Data que viene dentro de la interfaz de respuesta para cuando se crea una nueva categoría*/
export interface responseCategoryCreatedI {
    name: string;
    description: string;
    status: boolean;
    createdById: number;
    updatedById: number;
    updatedAt: string;
    id: number;
    createdAt: string;
}

/*Interfaz de respuesta de la API para cuando se edita una categoría*/
export interface ApiResponseEditCategoryI {
    statusCode: number;
    message: string;
    data: {
        generatedMaps: [];
        raw: [];
        affected: number;
    }
}