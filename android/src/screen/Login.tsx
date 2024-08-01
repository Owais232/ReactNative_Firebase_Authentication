import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View, ActivityIndicator, TouchableOpacity } from "react-native";
import auth from '@react-native-firebase/auth';
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
                    <Button title="Login" onPress={handleLogin} />
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
