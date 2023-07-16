export interface ApiResponseMyTasksI{
  statusCode: number;
  message: string;
  data: MyTasksI[];
}

export interface MyTasksI {
  id: number;
  title: string;
  description: string;
  estimatedTime: number;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}
