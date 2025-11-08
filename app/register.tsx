import { registerThunk } from '@/redux/slices/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, router } from 'expo-router';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import colors from './constants/colors';

export default function Register() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((s) => s.auth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert('Semua field wajib diisi.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Konfirmasi password tidak cocok.');
      return;
    }
    const action = await dispatch(
      registerThunk({ name, email, password, password_confirmation: confirmPassword })
    );
    if (registerThunk.fulfilled.match(action)) {
      router.replace('/(tabs)');
    }
  };

  return (
    <ImageBackground
      source={require('@/assets/images/splash.jpg')}
      style={styles.container}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient colors={[colors.transparentBlack10, colors.transparentBlack70]} style={styles.gradient}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Image source={require('@/assets/images/logo.jpg')}  />
          </View>
        </View>

        <CustomInput label="Full Name" value={name} onChangeText={setName} placeholder="Enter your full name" />
        <CustomInput label="Email" value={email} onChangeText={setEmail} placeholder="Enter your email" />
        <CustomInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
        />
        <CustomInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm your password"
          secureTextEntry
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Register"
            onPress={handleRegister}
            style={styles.button}
            backgroundColor={colors.success}
            disabled={loading}
          />
          <CustomButton title="Back to Login" onPress={() => router.back()} style={styles.button} />
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
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
  },
  errorText: {
    color: '#ff5252',
    marginTop: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
  }
});