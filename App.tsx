import React, { Component } from "react";
import { StatusBar } from "react-native";
import ParkScreen from "./screens/ParkScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Navigation from "./navigation";

export default function App() {
    return (
        <SafeAreaProvider>
            <Navigation colorScheme={"dark"} />
            <StatusBar barStyle="light-content" />
        </SafeAreaProvider>
    );
}
