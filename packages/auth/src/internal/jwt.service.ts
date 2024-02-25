import { Injectable } from "@nestjs/common";
import jwt from "jsonwebtoken"
import { JwtUser } from "./dtos";



@Injectable()
export class JwtService {

    async generateAccessToken(user: JwtUser): Promise<string> {
        return jwt.sign(user, process.env.JWT_ACCESSTOKEN_SECRET!, { expiresIn: "3d" })
    }

    async verifyAccessToken(token: string): Promise<JwtUser | null> {
        try {
            return jwt.verify(token, process.env.JWT_ACCESSTOKEN_SECRET!) as JwtUser
        } catch (error) {
            return null
        }
    }
}
