import { LinearGradient } from 'expo-linear-gradient';
import { Stack, router } from 'expo-router';
import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import colors from './constants/colors';

export default class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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
            label="Full Name"
            value={this.state.name}
            onChangeText={(text) => this.setState({ name: text })}
            placeholder="Enter your full name"
          />
          <CustomInput
            label="Email"
            value={this.state.email}
            onChangeText={(text) => this.setState({ email: text })}
            placeholder="Enter your email"
          />
          <CustomInput
            label="Password"
            value={this.state.password}
            onChangeText={(text) => this.setState({ password: text })}
            placeholder="Enter your password"
            secureTextEntry
          />
          <CustomInput
            label="Confirm Password"
            value={this.state.confirmPassword}
            onChangeText={(text) => this.setState({ confirmPassword: text })}
            placeholder="Confirm your password"
            secureTextEntry
          />
          
          <View style={styles.buttonContainer}>
            <CustomButton
              title="Register"
              onPress={() => {}}
              style={styles.button}
              backgroundColor={colors.success}
            />
            <CustomButton
              title="Back to Login"
              onPress={() => router.back()}
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