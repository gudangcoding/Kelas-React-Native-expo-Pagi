import { LinearGradient } from 'expo-linear-gradient';
import { Stack, router } from 'expo-router';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { loginThunk } from '@/redux/slices/authSlice';
import colors from './constants/colors';

export default function Login() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((s) => s.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const action = await dispatch(loginThunk({ email, password }));
      if (loginThunk.fulfilled.match(action)) {
        router.replace('/(tabs)');
      }
    } catch {}
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1080' }}
      style={styles.container}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient colors={[colors.transparentBlack10, colors.transparentBlack70]} style={styles.gradient}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>LOGO</Text>
          </View>
        </View>
        <CustomInput label="Email" value={email} onChangeText={setEmail} placeholder="Enter your email" />
        <CustomInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <View style={styles.buttonContainer}>
          <CustomButton title="Login" onPress={handleLogin} style={styles.button} disabled={loading} />
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
    },
    errorText: {
        color: '#ff5252',
        marginTop: 8,
        alignSelf: 'flex-start',
        paddingHorizontal: 20,
    }
});
