export interface UploadVideos {
    isPublic: boolean;
    description: string;
    files: File;
}

export interface GetAllVideos {
    id: number;
    url: string,
    type: string;
    isPublic: boolean;
    description: string;
    createdAt: string;
    updatedAt: string;
}