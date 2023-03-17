import client from "../../config/client.config"
import { AccountListParams, LoginData } from "../../config/data_types/account_types"
import { AccountFormData } from './../../config/data_types/account_types';

export const login =  async (data: LoginData): Promise<any> => {
    return client.post("accounts/login", data);
}

export const logout = async (): Promise<any> => {
    return client.patch(`accounts/logout`)
}

export const fetchAccounts = async (params: AccountListParams): Promise<any> => {
    return client.get("accounts",{params})
}

export const createAccount = async (data: AccountFormData): Promise<any> => {
    return client.post("accounts",data);
}