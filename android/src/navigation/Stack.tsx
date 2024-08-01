import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screen/Login";
import Home from "../screen/Home";
import Register from "../screen/Register";
import { useAuth } from "../context/Authcontext";

const Stack = createNativeStackNavigator();

const Stackscreen = () => {
    const { user } = useAuth();

    return (
        <Stack.Navigator initialRouteName={user ? "Home" : "Login"}>
            {!user ? (
                <>
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                </>
            ) : (
                <Stack.Screen name="Home" component={Home} />
            )}
        </Stack.Navigator>
    );
};

export default Stackscreen;
