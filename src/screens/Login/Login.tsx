import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Box, Button, Center, Input, Text, View } from "native-base";
import React, { useState } from "react";
import { useLogin } from "../../api/queries/account.queries";
import { UserTypes } from "../../config/enum.config";
import { renderErrorText } from "../../helpers/message.helpers";
import routes, { AppParamList } from './../../config/routes.config';
import AppContext from './../../contexts/AppContext';

export default function Login(){
    const navigation = useNavigation<NativeStackNavigationProp<typeof AppParamList>>();
    const appContext = React.useContext(AppContext);
    const [formState,setFormState] = useState({
        user_name: "",
        password: ""
    })
    const [errors,setErrors] = useState(formState);
    const {isLoading,mutate} = useLogin({
        onSuccess: (data) => {
            if(data.data.user.user_type === UserTypes.superAdmin){
                toast.show(data.message, {type:"success"});
                appContext.setAuthData(data.data);
                navigation.replace(routes.accountList);
            } else {
                toast.show("Sorry , your account is not supported.",{type:"danger"});
            }
        },
        onError:(data) => {
            console.log(data.errors);
            setErrors(data.errors)
        }
    })

    return <View flex={1} backgroundColor="white">
        <Center px={"15px"} mx={"auto"} mt={100} w={["100%","70%","40%"]}>
            <Text fontSize="xl" fontWeight={"bold"}>Sign In</Text>
            <Box w="100%">
                <Box my={3}>
                    <Text mb={1} fontSize="md">User Name</Text>
                    <Input _web={{fontSize:"14px"}} onChangeText={(user_name) => setFormState({...formState,user_name})}  placeholder="Enter Email or user name"  value={formState.user_name}  />
                    <Text color="red.400">{renderErrorText(errors?.user_name)}</Text>
                </Box>
                <Box my={3}>
                    <Text mb={1} fontSize="md">Password</Text>
                    <Input _web={{fontSize:"14px"}} onChangeText={(password) => setFormState({...formState,password})}  secureTextEntry={true} placeholder="Enter your password"  value={formState.password}  />
                    <Text color="red.400">{renderErrorText(errors?.password)}</Text>
                </Box>
                <Box mt={10}>
                    <Button isLoading={isLoading} onPress={() => mutate(formState)}>Submit</Button>
                </Box>
            </Box>
        </Center>
    </View>
}