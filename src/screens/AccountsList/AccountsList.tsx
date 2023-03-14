import { Avatar, Box, Button, Center, CircleIcon, HStack, Input, ScrollView, Spinner, Text, View, VStack } from "native-base";
import React from "react";
import { AccountListParams } from "../../config/data_types/account_types";
import { useAccounts } from './../../api/queries/account.queries';
import { MaterialIcons } from '@expo/vector-icons';
import { debounced } from "../../helpers/value.helpers";
import { useNavigation } from '@react-navigation/native';
import routes from "../../config/routes.config";

export default function AccountsList(){
    const [params,setParams] = React.useState({} as Partial<AccountListParams>)
    const {isLoading,data} = useAccounts(params);
    const navigation = useNavigation();

    return <View flex={1}>
        <Center borderRadius={15} backgroundColor="white" shadow={4} px={15} mx="auto" mt={50} py={50} w={["100%","60%","60%"]}>
            <HStack py={2} borderBottomWidth={"2px"} borderBottomColor="gray.300" w="100%" alignItems={"center"} justifyContent={"between"} >
                <Text fontSize="lg" fontWeight={"bold"} >Accounts</Text>
                <Box ml="auto">
                    <Button onPress={() => navigation.navigate(routes.createAccount as never)}>New Account</Button>
                </Box>
            </HStack>
            <HStack space={2} py={2} mt={3} w={"100%"}>
                <Box flex={1}>
                    <Input size="lg" placeholder={'Search by User Name, Email, Contact Number'} leftElement={<MaterialIcons style={{marginLeft: 10}} size={20} name="search" />}  onChangeText={(val) => debounced(val,(query) => setParams({...params,query}))} />
                </Box>
                {(isLoading)? <Spinner size="sm" />:<></>}
            </HStack>
            <ScrollView mt={30}  w={"100%"}>
                {
                    (data?.data?.data && data?.data?.data?.length > 0)?
                    <>
                        {
                            data.data.data.map((item) => (
                                <HStack borderBottomColor={"gray.200"} borderBottomWidth={1} py={5} space={2} w="100%" px={15} alignItems="center" justifyContent={"between"}>
                                    <Avatar backgroundColor={"gray.200"}>
                                        <MaterialIcons size={25} name="person" />
                                    </Avatar>
                                    <VStack>
                                        <Text fontSize={16} fontWeight={"bold"}>{item.full_name}</Text>
                                        <Text>Email: {item.email}</Text>
                                        <Text color={"gray.400"}>User Name: {item.user_name}</Text>
                                    </VStack>
                                    <HStack space={2} ml="auto" alignItems="center">
                                        <Box>
                                            <Text color="gray.400">Contact Number</Text>
                                            <Text>{item.contact_number}</Text>
                                        </Box>
                                        
                                        <MaterialIcons color="gray.300" size={20} name="chevron-right" />
                                    </HStack>
                                </HStack>
                            ))
                        }
                    </>:<Text textAlign={"center"}>No Account yet</Text>
                }
            </ScrollView>
        </Center>
    </View>
}