import { LinearGradient } from 'expo-linear-gradient';
import { Stack, router } from 'expo-router';
import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import colors from './constants/colors';

export default class Login extends Component {
  state = {
    username: '',
    password: ''
  };

  render() {
    return (
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1080' }}
        style={styles.container}
      >
        <Stack.Screen options={{ headerShown: false }} />
        <LinearGradient
          colors={[colors.transparentBlack10, colors.transparentBlack70]}
          style={styles.gradient}
        >
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
                <Text style={styles.logoText}>LOGO</Text>
            </View>
          </View>
          <CustomInput
            label="Username"
            value={this.state.username}
            onChangeText={(text) => this.setState({ username: text })}
            placeholder="Enter your username"
          />
          <CustomInput
            label="Password"
            value={this.state.password}
            onChangeText={(text) => this.setState({ password: text })}
            placeholder="Enter your password"
            secureTextEntry
          />
          <View style={styles.buttonContainer}>
            <CustomButton
              title="Login"
              onPress={() => router.replace('/(tabs)')}
              style={styles.button}
            />
            <CustomButton
              title="Register"
              onPress={() => router.push('/register')}
              backgroundColor={colors.success}
              style={styles.button}
            />
          </View>
        </LinearGradient>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
    },
    logoContainer: {
        marginBottom: 40,
        alignItems: 'center',
    },
    logoCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255,255,255,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    logoText: {
        fontSize: 24,
        fontWeight: 'bold',
    color: colors.gray,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
    }
});
