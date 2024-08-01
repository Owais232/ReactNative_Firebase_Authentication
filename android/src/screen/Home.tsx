import React from "react";
import { Text, View, Button } from "react-native";
import auth from '@react-native-firebase/auth';
import { useAuth } from "../context/Authcontext";

const Home = ({ navigation }) => {
    const { setUser } = useAuth();

    const handleLogout = async () => {
        try {
            await auth().signOut();
            setUser(null); // Clear the user state in context
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Text style={{ fontSize: 20 }}>Home Screen</Text>
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
}

export default Home;
