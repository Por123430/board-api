type Message = 'Success' | 'Error';
export interface ApiResponse<T> {
    message: Message;
    data: T | any;
}