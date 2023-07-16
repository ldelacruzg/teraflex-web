export interface ApiResponseMyVideosI{
    statusCode: number;
    message: string;
    data: GetAllMyVideosI[];
  }

export interface UploadVideos {
    isPublic: boolean;
    description: string;
    files: File;
}

export interface GetAllMyVideosI {
    id: number;
    url: string,
    type: string;
    isPublic: boolean;
    description: string;
    createdAt: string;
    updatedAt: string;
}