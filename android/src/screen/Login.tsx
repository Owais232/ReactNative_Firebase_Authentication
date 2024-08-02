import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useAuth } from "../context/Authcontext";

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [loading, setLoading] = useState(false);
    const { setUser } = useAuth();

    const handleLogin = async () => {
        setLoading(true);

        try {
            const userCredential = await auth().signInWithEmailAndPassword(email, pass);
            setUser(userCredential.user);
            navigation.navigate('Home');
        } catch (error) {
            console.error(error);
            Alert.alert('Login Error', 'Failed to log in. Please check your credentials and try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);

        try {
            await GoogleSignin.hasPlayServices();
            await GoogleSignin.signOut();
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            const userCredential = await auth().signInWithCredential(googleCredential);

            // Get user data
            const user = userCredential.user;
            const userId = user.uid;
            const userEmail = user.email;
            const userName = user.displayName;

            // Save user data to Firebase Realtime Database
            const userRef = database().ref(`users/${userId}`);
            await userRef.set({
                email: userEmail,
                name: userName,
                // Add any other user data you want to save
            });

            // Update context and navigate
            setUser(userCredential.user);
            navigation.navigate('Home');
        } catch (error) {
            console.error('Google Sign-In Error:', error);
            Alert.alert('Google Sign-In Error', 'Google sign-in failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <TextInput
                    placeholder="Enter email"
                    value={email}
                    style={styles.input}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    placeholder="Enter Pass"
                    style={styles.input}
                    secureTextEntry
                    value={pass}
                    onChangeText={text => setPass(text)}
                />
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <>
                        <Button title="Login" onPress={handleLogin} />
                        <Button title="Login with Google" onPress={handleGoogleLogin} />
                    </>
                )}
            </View>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <Text>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={{ color: 'blue' }}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapper: {
        width: '80%',
    },
    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 5,
        paddingHorizontal: 14
    }
});

export default Login;
