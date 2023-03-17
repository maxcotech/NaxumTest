import { QueryFunction, useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "react-query";
import { Account, AccountFormData, AccountListParams, AuthData, LoginData } from "../../config/data_types/account_types";
import { GenericDataResponse, HttpDataResponse, PaginatedDataResponse } from "../../config/data_types/general.types";
import { fetchAccounts, login, logout } from "../services/account.services";
import { createAccount } from './../services/account.services';

export const AccountQueryKeys = {
    fetchAccountList: "fetch/account_list"
}

export const useLogout = (options: UseMutationOptions<HttpDataResponse,HttpDataResponse,unknown>) => {
    return useMutation<HttpDataResponse,HttpDataResponse,unknown>(logout,options)
}

export const useLogin = (options: UseMutationOptions<GenericDataResponse<AuthData>,HttpDataResponse,LoginData>) => {
    return useMutation<GenericDataResponse<AuthData>,HttpDataResponse,LoginData>(login,options);
}

export const useAccounts = (params: AccountListParams, options: UseQueryOptions<AccountListParams,HttpDataResponse,PaginatedDataResponse<Account[]>>) => {
    return useQuery<AccountListParams,HttpDataResponse,PaginatedDataResponse<Account[]>>([AccountQueryKeys.fetchAccountList,params],(() => fetchAccounts(params)) as QueryFunction<AccountListParams>, options)
}

export const useCreateAccount = (options: UseMutationOptions<HttpDataResponse,HttpDataResponse,AccountFormData>) => {
    return useMutation<HttpDataResponse,HttpDataResponse,AccountFormData>(createAccount, options)
}
