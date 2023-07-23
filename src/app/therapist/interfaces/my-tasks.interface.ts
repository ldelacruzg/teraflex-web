/*Interfaz de respuesta de la API cuando se listan las tareas*/
export interface ApiResponseMyTasksI{
  statusCode: number;
  message: string;
  data: MyTasksI[];
}

/*Interfaz para obtener obtener el listado de las tareas*/
export interface MyTasksI {
  id: number;
  title: string;
  description: string;
  estimatedTime: number;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

/*Interfaz para cuando se registra una tarea*/
export interface RegisterTaskDetailI{
  title: string;
  description: string;
  status: boolean;
  estimatedTime: number;
  isPublic: boolean;
  categoryIds: number[];
  fileIds: number[];
}

/*Interfaz de respuesta de la API para cuando se registra una tarea*/
export interface ApiResponseRegisterTaskDetailI{
  statusCode: number;
  message: string;
  data: TaskDetailResponseApiI[];
}

/*Interfaz del detalla de registro de la tarea, viene dentro de la data*/
export interface TaskDetailResponseApiI{
  title: string;
  description: string;
  status: boolean;
  estimatedTime: number;
  isPublic: boolean;
  createdById: number;
  updatedById: number;
  updatedAt: string;
  id: number;
  createdAt: string;
}
