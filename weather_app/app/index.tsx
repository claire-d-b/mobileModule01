import React from "react";
import { PaperProvider, MD3LightTheme } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CAppbar from "./CAppbar";

const _ = () => {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={MD3LightTheme}>
        <CAppbar />
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default _;
