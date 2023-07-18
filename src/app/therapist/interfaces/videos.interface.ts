export interface ApiResponseMyVideosI {
    statusCode: number;
    message: string;
    data: GetAllMyVideosI[];
}

export interface ApiResponseRegisterVideoLocalI {
    data: RegisterVideoLocalResponse;
    message: string;
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

export interface RegisterVideoLocal {
    isPublic: boolean;
    description: string;
    files: FormData[];
}

export interface RegisterVideoLocalResponse {
    id: number;
    url: "string"
}