import { Response } from "express";

class ApiResponse {

    data: any[] | Record<string, any>;
    message:string
    statusCode : number

    constructor(data: any[] | Record<string, any>, message: string, statusCode: number){
        this.data = data;
        this.message=message;
        this.statusCode=statusCode;
    }

    static success(data: any[] | Record<string, any>, message: string, statusCode: number = 200) {
        return new ApiResponse(data, message, statusCode);
    }

    static failure(data: any[] | Record<string, any>, message: string, statusCode: number = 400) {
        return new ApiResponse(data, message, statusCode);
    }

    send(res: Response) {
        res.status(this.statusCode).json(this)
     }

}

export default ApiResponse;