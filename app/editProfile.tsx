import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Pressable, ScrollView, Image, Modal } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import colors from './constants/colors';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

export default function EditProfile() {
  const router = useRouter();

  const [avatarSource, setAvatarSource] = useState<any>(require('../assets/images/icon.png'));
  const [photoModalOpen, setPhotoModalOpen] = useState(false);

  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('081234567890');
  const [province, setProvince] = useState('Jawa Barat');
  const [city, setCity] = useState('Bandung');
  const [address, setAddress] = useState('Jl. Contoh No. 123, Kec. Coblong');

  const openPhotoModal = () => setPhotoModalOpen(true);
  const closePhotoModal = () => setPhotoModalOpen(false);

  const handlePickCamera = () => {
    // Placeholder: set a sample image as if captured from camera
    setAvatarSource(require('../assets/images/android-icon-foreground.png'));
    closePhotoModal();
  };

  const handlePickGallery = () => {
    // Placeholder: set a sample image as if selected from gallery
    setAvatarSource(require('../assets/images/react-logo.png'));
    closePhotoModal();
  };

  const handleUpdate = () => {
    // Placeholder update action
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerTitle: 'Edit Profil', headerTintColor: colors.grayDark }} />
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.avatarRow}>
            <Image source={avatarSource} style={styles.avatar} />
            <Pressable style={styles.changePhotoBtn} onPress={openPhotoModal} accessibilityRole="button">
              <Feather name="camera" size={16} color={colors.onPrimary} />
              <Text style={styles.changePhotoText}>Ganti Foto</Text>
            </Pressable>
          </View>

          <View style={{ height: 12 }} />

          <CustomInput label="Nama" value={name} onChangeText={setName} />
          <CustomInput label="Email" value={email} onChangeText={setEmail} />
          <CustomInput label="Password" value={password} onChangeText={setPassword} secureTextEntry />
          <CustomInput label="No HP" value={phone} onChangeText={setPhone} />
          <CustomInput label="Provinsi" value={province} onChangeText={setProvince} />
          <CustomInput label="Kota" value={city} onChangeText={setCity} />

          {/* Alamat lengkap sebagai textarea sederhana */}
          <View style={styles.addressBox}>
            <Text style={styles.addressLabel}>Alamat Lengkap</Text>
            <View style={styles.addressInputWrap}>
              <ScrollView>
                <Text style={styles.addressText}>{address}</Text>
              </ScrollView>
            </View>
          </View>

          <View style={{ height: 12 }} />

          <CustomButton title="Update" onPress={handleUpdate} />
        </View>
      </ScrollView>

      <Modal transparent visible={photoModalOpen} animationType="fade" onRequestClose={closePhotoModal}>
        <Pressable style={styles.modalOverlay} onPress={closePhotoModal} />
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Ganti Foto</Text>
          <View style={{ height: 12 }} />
          <Pressable style={styles.modalOption} onPress={handlePickCamera} accessibilityRole="button">
            <Feather name="camera" size={18} color={colors.grayDark} />
            <Text style={styles.modalOptionText}>Kamera</Text>
          </Pressable>
          <Pressable style={styles.modalOption} onPress={handlePickGallery} accessibilityRole="button">
            <Feather name="image" size={18} color={colors.grayDark} />
            <Text style={styles.modalOptionText}>Galeri</Text>
          </Pressable>

          <View style={{ height: 12 }} />
          <Pressable style={styles.modalCloseBtn} onPress={closePhotoModal} accessibilityRole="button">
            <Text style={styles.modalCloseText}>Tutup</Text>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: colors.transparentBlack10,
  },
  changePhotoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: colors.primary,
  },
  changePhotoText: {
    color: colors.onPrimary,
    fontWeight: '700',
  },
  addressBox: {
    marginTop: 4,
  },
  addressLabel: {
    fontSize: 12,
    color: colors.gray,
    marginLeft: 6,
    marginBottom: 6,
  },
  addressInputWrap: {
    minHeight: 70,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: colors.white,
  },
  addressText: {
    fontSize: 14,
    color: colors.grayDark,
    lineHeight: 20,
  },
  modalOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.transparentBlack70,
  },
  modalContent: {
    position: 'absolute',
    left: 20,
    right: 20,
    top: '35%',
    borderRadius: 14,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.grayDark,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.transparentBlack10,
  },
  modalOptionText: {
    fontSize: 14,
    color: colors.grayDark,
    fontWeight: '600',
  },
  modalCloseBtn: {
    alignSelf: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.gray,
  },
  modalCloseText: {
    color: colors.onPrimary,
    fontWeight: '700',
  },
});