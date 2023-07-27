/*Interfaz que se usa para asignar las tareas a un usuario*/
export interface AssignTasksToPatientI {
    tasks: BodyTaskToAssignI[];
    dueDate: string;
}

/*Interfaz que contiene el detalle de la tarea a asignar, va dentro de la interfaz de arriba*/
export interface BodyTaskToAssignI {
    description: string,
    estimatedTime: number,
    id: number
}

/*Respuesta de la API una vez que se registran las asignaciones*/
export interface ApiResponseAssignTasksToPatientI {
    statusCode: number;
    message: string;
    data: {
        identifiers: [
            {
                id: number;
            }
        ],
        generatedMaps: [
            {
                id: number;
                status: boolean;
                estimatedTime: number;
                isCompleted: boolean;
                createdAt: string;
                updatedAt: string;
            }
        ],
        raw: [
            {
                id: number,
                status: true,
                estimated_time: number,
                is_completed: boolean,
                created_at: string,
                updated_at: string
            }
        ]
    }
}