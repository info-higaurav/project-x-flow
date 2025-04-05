import { Request, Response } from "express"
import ApiResponse from "../utils/apiResponse"
import UserService from "../service/users.service"
import { IAuth } from "../model/auth.model"
import { authVal, IAuthInput, IUserInput } from "../validation/user.validation"



const healthCheckUp = (req:Request , res:Response)=>{
    return ApiResponse.success([], "Routes are working fine", 200).send(res)
}

const registerUser = async (req:Request , res:Response)=>{
    const userService = new UserService()
    
    const payload:IAuth = req.body;
    const isUserExists = await userService.isUserExists(payload.email)
    
    if(isUserExists){
        return ApiResponse.failure([],"User already exists",409).send(res);
    }
    const userData:IUserInput = {
        firstName: null,
        lastName: null,
        role: "admin", 
    };
    
    const user = await userService.createUser(userData);
    const updateAuthPayload = {
        ...payload,
        userId:user?._id,
        lastLogin: new Date(),
        isActive: true
    };
    const validatedPayload:IAuthInput = authVal.parse(updateAuthPayload);
    const createCredential = await userService.createCredential(validatedPayload);
    const userId = String(createCredential._id)
    const accessToken = await userService.genAccessToken(userId);
    const refreshToken = await userService.genRefreshToken(userId);

    res.cookie("accessToken" , accessToken ,{
        httpOnly:true,
        secure:true,
        expires: new Date(Date.now() + 24 *60 *60 * 1000),
        sameSite:"none"
    })

    res.cookie("refreshToken" , refreshToken ,{
        httpOnly:true,
        secure:true,
        expires: new Date(Date.now() + 7 *24 *60 *60 * 1000),
        sameSite:"none"
    })

    res.set({
        "Authorization":`Bearer ${accessToken}`,
        "x-refresh-token":refreshToken
    })

    const updateToken = await userService.updateToken(userId, accessToken, refreshToken)
    return ApiResponse.success([updateToken], "Credentials has been created",201).send(res);
}

const handleLogin = async (req:Request, res:Response)=>{
    
    const payload = req.body;
    const {email, password}=payload;

    const userService = new UserService();
    const isUserExists = await userService.isUserExists(email);

    if(!isUserExists){
        return ApiResponse.failure([], "Email doesn't exists", 400).send(res);
    }

    const getUser = await userService.getUserByEmail(email)
    const hashedPassword =getUser[0]?.password;
    const userId = String(getUser[0]?._id);
    const verifyPass = await userService.comparePassword(password, hashedPassword)

    if(!verifyPass){
        return ApiResponse.failure([],"Incorrect Password", 400).send(res);
    }

    const accessToken = await userService.genAccessToken(userId)
    const refreshToken = await userService.genRefreshToken(userId)

    res.cookie("accessToken",accessToken,{
        httpOnly:true,
        secure:true,
        expires:new Date(Date.now() + 24 *60 *60 *1000),
        sameSite:"none"
    })

    res.cookie("refreshToken", refreshToken,{
        httpOnly:true,
        secure:true,
        expires: new Date(Date.now() + 7 *24 * 60 *60 *1000),
        sameSite:"none"
    })

    res.set({
        "Authorization":`Bearer ${accessToken}`,
        "x-refresh-token":refreshToken
    })

    const updateTokenAndGetUser = userService.updateToken(userId, accessToken, refreshToken);

    return ApiResponse.success([updateTokenAndGetUser],"Login Successfully", 200).send(res);

}

const handleCreateUser = async(req:Request, res:Response)=>{
    const userService = new UserService()
    
    const payload:IAuth = req.body;
    const isUserExists = await userService.isUserExists(payload.email)
    
    if(isUserExists){
        return ApiResponse.failure([],"User already exists",409).send(res);
    }
    const userData:IUserInput = {
        firstName: null,
        lastName: null,
        role: "user", 
    };
    
    const user = await userService.createUser(userData);
    const updateAuthPayload = {
        ...payload,
        userId:user?._id,
        lastLogin: new Date(),
        isActive: true
    };
    const validatedPayload:IAuthInput = authVal.parse(updateAuthPayload);
    const createUser = await userService.createCredential(validatedPayload);
    return ApiResponse.success([createUser], "Credentials has been created",201).send(res);

}
export {
    healthCheckUp,
    registerUser,
    handleLogin,
    handleCreateUser
}
