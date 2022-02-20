import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import MainPage from "./components/MainPage";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box h="100vh">
      <MainPage />
    </Box>
  </ChakraProvider>
);
