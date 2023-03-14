import axios, { AxiosError } from "axios";
import { HttpDataResponse } from "./data_types/general.types";

//TODO: move to env
export const baseUrl = "http://localhost:8000/api/v1/";

const client = axios.create({baseURL:baseUrl});
client.interceptors.request.use(async (configs: any) => {
    if(typeof configs !== 'undefined' && configs.headers){
        configs.headers.accept = "application/json";
        configs.headers.contentType 
        // configs.timeout = 2;
        return configs;
    }
})

client.interceptors.response.use(
    function (response){
        return response?.data;
    },
    function (error:AxiosError){
        const errPayload = error?.response?.data as HttpDataResponse;
        console.log(error);
        if(error?.response?.status !== undefined){
            if(error.response.status !== 403){
                toast.show(errPayload?.message ?? error?.message ?? "An Unknown error occurred",{
                    type:"danger"
                })
            }
        }
        return Promise.reject(errPayload);
    }
)

export default client;
