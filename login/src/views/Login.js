import React, {useState, useContext, useEffect} from "react";
import { useNavigation } from '@react-navigation/native';
import {
  Text,
  Heading,
  Container,
  Center,
  Box,
  Input, 
  Stack, 
  FormControl,
  Button,
  VStack,
  HStack,
  Alert,
  IconButton,
  CloseIcon,
  Toast
} from "native-base";



//Styles
import globalStyles from "../styles/global";
import {COLORS} from "../styles/colors";


//Context
import authContext from "../contexts/authContext";
import { Keyboard } from "react-native";


export default function Login({navigation}) {

    //Context de Autenticacion
    const aContext = useContext(authContext);
    const {usuario, mensaje, token, autenticado, iniciarSesion, usuarioAutenticado, limpiarError} = aContext;

    //Valores state
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handlerIniciarSesion = async () => {
        Keyboard.dismiss();
        await iniciarSesion({userName, password});
        
    }

    useEffect(() => {
        const foc = () => {
            navigation.addListener('focus', () => {
                limpiarError();
            })
        }
        foc();
    },[navigation])


    const notificacion = (mensaje) => {
        Toast.show({
            render: () => {
                return <Alert w="100%" status="error">
                            <VStack space={2} flexShrink={1} w="100%">
                                <HStack flexShrink={1} space={2} justifyContent="space-between">
                                <HStack space={2} flexShrink={1}>
                                    <Alert.Icon mt="1" />
                                    <Text fontSize="md" color="coolGray.800">
                                        {mensaje}
                                    </Text>
                                </HStack>
                                <IconButton variant="unstyled" _focus={{
                                borderWidth: 0
                            }} icon={<CloseIcon size="3" />} _icon={{
                                color: "coolGray.600"
                            }} />
                                </HStack>
                            </VStack>
                        </Alert>;         
            }
        });
        limpiarError();
    }

    useEffect(() => {
        if(autenticado === true) navigation.navigate('Home');
    },[autenticado]);

    useEffect(() => {
        if(mensaje !== null && mensaje !== '') notificacion(mensaje);
    },[mensaje]);

    return (
        <Center flex={1} bg={{
            linearGradient: {
            colors: [COLORS.background, COLORS.backgrounB],
            start: [0, 0],
            end: [1, 0]
            }}}>
           
            <Box style={[globalStyles.contenedor]}>
                
                <Heading style={globalStyles.titulo}>Iniciar Sesion</Heading>
                
                <FormControl>
                    <Stack space={5}>
                        <Stack style={globalStyles.input}>
                            <Input variant="outline" p={2} placeholder="Username" value={userName} onChangeText={(text) => setUserName(text)}/>
                        </Stack>
                        <Stack style={globalStyles.input}>
                            <Input variant="outline" p={2} placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true}/>
                        </Stack>
                    </Stack>
                </FormControl>

                <Button size="sm" width={"100%"} style={globalStyles.boton} onPress={handlerIniciarSesion}>
                    <Text color="white">Iniciar Sesion</Text>
                </Button> 
            </Box>
                
           
        </Center>
    );
}
