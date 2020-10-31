import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import ParkScreen from "../screens/ParkScreen";
//import TabTwoScreen from "../screens/TabTwoScreen";
import { BottomTabParamList, ParkParamList } from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
    return (
        <BottomTab.Navigator
            initialRouteName="Park"
            tabBarOptions={{ activeTintColor: Colors["dark"].tint }}
        >
            <BottomTab.Screen
                name="Park"
                component={ParkNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="ios-code" color={color} />
                    ),
                }}
            />
            {/* <BottomTab.Screen
                name="TabTwo"
                component={TabTwoNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="ios-code" color={color} />
                    ),
                }}
            /> */}
        </BottomTab.Navigator>
    );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
    return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const ParkStack = createStackNavigator<ParkParamList>();

function ParkNavigator() {
    return (
        <ParkStack.Navigator>
            <ParkStack.Screen
                name="ParkScreen"
                component={ParkScreen}
                options={{ headerTitle: "Park" }}
            />
        </ParkStack.Navigator>
    );
}

// const TabTwoStack = createStackNavigator<TabTwoParamList>();

// function TabTwoNavigator() {
//     return (
//         <TabTwoStack.Navigator>
//             <TabTwoStack.Screen
//                 name="TabTwoScreen"
//                 component={TabTwoScreen}
//                 options={{ headerTitle: "Tab Two Title" }}
//             />
//         </TabTwoStack.Navigator>
//     );
// }
