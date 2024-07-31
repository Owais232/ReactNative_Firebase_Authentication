import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screen/Login";
import Home from "../screen/Home";
import Register from "../screen/Register";



const Stack = createNativeStackNavigator();

const Stackscreen = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login}
                options={
                    { headerShown: false }
                } />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Register" component={Register}
                options={
                    { headerShown: false }
                } />
        </Stack.Navigator>

    );
};

export default Stackscreen;