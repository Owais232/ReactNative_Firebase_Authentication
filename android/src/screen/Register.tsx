import { useState } from "react";
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const Register = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        setLoading(true);

        try {

            const { user } = await auth().createUserWithEmailAndPassword(email, pass);
            const userId = user.uid;
            await database().ref(`users/${userId}`).set({
                name: name,
                email: email,
            });

            navigation.navigate('Login');
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
                    placeholder="Enter Name"
                    value={name}
                    style={styles.input}
                    onChangeText={text => setName(text)}
                />
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
                    <Button title="Register" onPress={handleRegister} />
                )}
            </View>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <Text>Already have an Account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={{ color: 'blue' }}>Login</Text>
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

export default Register;
