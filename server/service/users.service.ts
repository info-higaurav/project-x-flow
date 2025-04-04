import Auth, { IAuth } from "../model/auth.model";
import User from "../model/user.model";
import { IAuthInput, IUserInput } from "../validation/user.validation";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

class UserService {
 
    async isUserExists (email:string) {

       const res = await Auth.find({email:email})
       if(res.length !== 0){
        return true;
       }

       return false;
    }

    async getUserByEmail (email:string){
            const res = await Auth.find({email:email})
            return res;   
    }

    async getUserById (userId:string){
        const res = await Auth.findById(userId)
        return res;
    }

    async createCredential (payload:IAuthInput){
       const res = await Auth.create(payload);
       return res;
    }

    async createUser (payload:IUserInput){
        const res = await User.create(payload);
        return res;
     }

     async genAccessToken(userId:string){
      const accessToken = jwt.sign({userId:userId},process.env.JWT_SECRECT_ACCESS_TOKEN as string , {expiresIn:"1d"})
      return accessToken;
     }

     async genRefreshToken(userId:string){
      const refreshToken = jwt.sign({userId:userId},process.env.JWT_SECRECT_REFRESH_TOKEN as string , {expiresIn:"7d"})
      return refreshToken;
     }

     async updateToken (userId:string , accessToken:string, refreshToken:string){
      const updateAccesstoekn = await Auth.findByIdAndUpdate(userId,{accessToken:accessToken, refreshToken:refreshToken},{new:true}).select("-password -__v")
      return updateAccesstoekn;
     }

     async comparePassword (password:string, hashedPassword:string){
         const verifyPassword = await bcrypt.compare(password, hashedPassword)
         return verifyPassword;
     }

    
}

export default UserService;