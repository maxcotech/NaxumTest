import { ParamListBase } from "@react-navigation/native"

const GeneralRoutes = {
    login: "auth/login"
}

const AccountRoutes = {
    accountList: "accounts/list",
    createAccount: "accounts/create"
}

const routes = {
    ...GeneralRoutes, ...AccountRoutes
}

export const AppParamList = Object.assign({},...Object.keys(routes).map((key) => { return {[key]:{}}})) as ParamListBase


export default routes;