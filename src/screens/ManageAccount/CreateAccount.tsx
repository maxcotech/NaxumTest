import { Button, Input } from "native-base";
import { Box, Center, Text, View } from "native-base";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { useCreateAccount } from "../../api/queries/account.queries";
import { AccountFormData } from "../../config/data_types/account_types";
import { renderErrorText } from "../../helpers/message.helpers";
import { AccountQueryKeys } from './../../api/queries/account.queries';
import { useNavigation } from '@react-navigation/native';

export default function CreateAccount(){
    const [formState,setFormState] = useState({
        full_name: "",
        user_name: "",
        contact_number: "",
        email: "",
        password: "",
        confirm_password: ""
    } as AccountFormData)

    const [errors,setErrors] = useState(formState);
    const client = useQueryClient();
    const navigation = useNavigation();
    const {isLoading,mutate} = useCreateAccount({
        onError: (data) => {setErrors(data.errors)},
        onSuccess: (data) => {
            toast.show(data.message,{type: "success"});
            client.invalidateQueries(AccountQueryKeys.fetchAccountList);
            if(navigation.canGoBack){
                navigation.goBack();
            }
        }
    })


    return (
        <View flex={1} backgroundColor="white">
            <Center px={"15px"} mx={"auto"} mt={100} pb={100} w={["100%","70%","40%"]}>
            <Text fontSize="xl" fontWeight={"bold"}>Add New Account</Text>
            <Box w="100%">
                <Box my={3}>
                    <Text mb={1} fontSize="md">User Name</Text>
                    <Input _web={{fontSize:"14px"}} onChangeText={(user_name) => setFormState({...formState,user_name})}  placeholder="Enter user name"  value={formState.user_name}  />
                    <Text color="red.400">{renderErrorText(errors?.user_name)}</Text>
                </Box>
                <Box my={3}>
                    <Text mb={1} fontSize="md">Full Name</Text>
                    <Input _web={{fontSize:"14px"}} onChangeText={(full_name) => setFormState({...formState,full_name})}  placeholder="Enter Full Name"  value={formState.full_name}  />
                    <Text color="red.400">{renderErrorText(errors?.full_name)}</Text>
                </Box>
                <Box my={3}>
                    <Text mb={1} fontSize="md">Email</Text>
                    <Input keyboardType="email-address" _web={{fontSize:"14px"}} onChangeText={(email) => setFormState({...formState,email})}  placeholder="Enter Email Address"  value={formState.email}  />
                    <Text color="red.400">{renderErrorText(errors?.email)}</Text>
                </Box>
                <Box my={3}>
                    <Text mb={1} fontSize="md">Contact Number</Text>
                    <Input keyboardType="phone-pad" _web={{fontSize:"14px"}} onChangeText={(contact_number) => setFormState({...formState,contact_number})}  placeholder="Enter Contact Phone Number"  value={formState.contact_number}  />
                    <Text color="red.400">{renderErrorText(errors?.contact_number)}</Text>
                </Box>
                <Box my={3}>
                    <Text mb={1} fontSize="md">Password</Text>
                    <Input _web={{fontSize:"14px"}} onChangeText={(password) => setFormState({...formState,password})}  type="password" placeholder="Enter your password"  value={formState.password}  />
                    <Text color="red.400">{renderErrorText(errors?.password)}</Text>
                </Box>
                <Box my={3}>
                    <Text mb={1} fontSize="md">Confirm Password</Text>
                    <Input _web={{fontSize:"14px"}} onChangeText={(confirm_password) => setFormState({...formState,confirm_password})}  type="password" placeholder="Re-enter password"  value={formState.confirm_password}  />
                    <Text color="red.400">{renderErrorText(errors?.confirm_password)}</Text>
                </Box>
                <Box mt={10}>
                    <Button isLoading={isLoading} onPress={() => mutate(formState)}>Create Account</Button>
                </Box>
            </Box>
        </Center>
        </View>
    )
}