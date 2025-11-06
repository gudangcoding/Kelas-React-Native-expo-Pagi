import CustomButton from '@/components/CustomButton';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from './constants/colors';

export default function Menu() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.wrapButton}>
                <CustomButton
                    title='Kolom'
                    backgroundColor={colors.primary}
                    onPress={() => router.push('/Kolom')}
                />
                <CustomButton
                    title='Baris'
                    backgroundColor={colors.purlple}
                    onPress={() => router.push('/Baris')}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: colors.background
    },
    wrapButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10, // Menambahkan gap antara tombol
        marginBottom: 0 // Menghapus margin bottom
    }
})
