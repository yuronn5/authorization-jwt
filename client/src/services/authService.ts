import $api from "../http"
import { AxiosResponse } from "axios"
import { AuthResponce } from "../models/responce/AuthResponce"

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponce>> {
        return $api.post<AuthResponce>("/login", { email, password })
    }
}