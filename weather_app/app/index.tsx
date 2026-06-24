import React from "react";
import { PaperProvider, MD3LightTheme } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CAppbar from "./CAppbar";

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={MD3LightTheme}>
        <CAppbar />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
