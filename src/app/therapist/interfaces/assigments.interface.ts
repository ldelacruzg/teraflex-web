import { DetailTreatmentI } from "./patients.interface";

/*Interfaz que se usa para asignar las tareas a un usuario*/
export interface AssignTasksToPatientI {
    tasks: BodyTaskToAssignI[];
}

/*Interfaz que contiene el detalle de la tarea a asignar, va dentro de la interfaz de arriba*/
export interface BodyTaskToAssignI {
    taskId: number;
    expirationDate: string;
    timePerRepetition: string;
    repetitions: number;
    breakTime: string;
    series: number;
}

/*Respuesta de la API una vez que se registran las asignaciones*/
export interface ApiResponseAssignTasksToPatientI {
    statusCode: number;
    message: string;
    data: ApiResponseAssignTasksToPatientDataI[];
}

export interface ApiResponseAssignTasksToPatientDataI {
    taskId:            number;
    expirationDate:    Date;
    timePerRepetition: string;
    repetitions:       number;
    breakTime:         string;
    series:            number;
    treatmentId:       number;
    performanceDate:   null;
    id:                number;
    assignmentDate:    string;
}

/*Interfaz de respuesta de la API para visualizar la lista de tareas asignadas a un paciente por ID*/
export interface ApiResponseListTasksAssignsToPatientI {
    statusCode: number;
    message: string;
    data: TaskDetailAssignToPatientI[];
}

/*Interfaz que viene dentro de la interfaz de arriba, contiene el detalle de la tarea asignada*/
export interface TaskDetailAssignToPatientI {
    id: number;
    task: {
        id: number;
        title: string;
    },
    treatment: {
        id: number;
        title: string;
    },
    assignmentDate: string;
    performanceDate: string;
    expirationDate: string;
}

/*Interfaz de respuesta de la API para cuando se obtiene el detalle de una tarea Asignada*/
export interface ApiResponseTaskDetailExtendAssignToPatientI{
    statusCode: number;
    message: string;
    data: TaskDetailExtendAssignToPatientI;
}

/*Ibterfaz que viene dentro de data de la interfaz de arriba*/
export interface TaskDetailExtendAssignToPatientI{
    assignmentId: number;
    treatment: {
        id: number;
        title: string;
    },
    task: {
        id: number;
        title: string;
        description: string;
        assignmentDate: string;
        expirationDate: string;
        performanceDate?: string;
    },
    setting: {
        timePerRepetition: number;
        repetitions: number;
        breakTime: number;
        series: number;
    },
    multimedia: {
        id: number;
        url: string;
        title: string;
        description: string;
    }[]
}

/*Interfaz de respuesta de la API para cuando se obtiene los tratamientos*/
export interface APIResponseListTreatmentByPatientI<T extends ListTreatmentI | DetailTreatmentI> {
    statusCode: number;
    message:    string;
    data:       T[];
}

export interface ListTreatmentI {
    id:             number;
    title:          string;
    numberTasks:    number;
    completedTasks: number;
    overdueTasks:   number;
    pendingTasks:   number;
}