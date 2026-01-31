export interface ApiResponse<T> {
    data: T;
    message: string;
}

export interface ApiMeta {
    page: number,
    perPage: number,
    total: number,
    totalPages: number
}

export interface ApiResponseWithItems<T> {
    data: {
        items: T[];
        meta: ApiMeta;
    };
    message: string;
}