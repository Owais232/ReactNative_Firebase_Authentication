import React, { useEffect, useState } from "react";
import { Text, View, Button } from "react-native";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { useAuth } from "../context/Authcontext";

const Home = ({ navigation }) => {
    const { user, setUser } = useAuth();
    const [name, setName] = useState('');

    useEffect(() => {
        if (user) {
            const userId = user.uid;
            const userRef = database().ref(`users/${userId}`);

            userRef.once('value')
                .then(snapshot => {
                    if (snapshot.exists()) {
                        const userData = snapshot.val();
                        setName(userData.name);
                    }
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [user]);

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
            {name ? <Text style={{ fontSize: 20 }}>Welcome, {name}!</Text> : <Text>Loading...</Text>}
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
}

export default Home;
