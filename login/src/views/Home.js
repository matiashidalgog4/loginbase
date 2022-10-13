import React, {useState, useContext, useEffect} from "react";

import {
  Text,
  Heading,
  Container,
  Center,
  Box,
  Input, 
  Stack, 
  FormControl,
  Button
  
} from "native-base";


//Styles
import globalStyles from "../styles/global";
import {COLORS} from "../styles/colors";

//Context
import authContext from "../contexts/authContext";


export default function Home() {



    return (
        <Center flex={1} style={{backgroundColor: COLORS.background}}>
            <Box style={[globalStyles.contenedor]}>
                
                <Heading style={globalStyles.titulo}>Home</Heading>
                

            </Box>
        </Center>

    );
}
