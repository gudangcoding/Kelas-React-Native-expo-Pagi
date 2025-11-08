import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, ScrollView, Pressable, Dimensions } from 'react-native';
import { Stack, useRouter, useNavigation } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import colors from './constants/colors';

const { width } = Dimensions.get('window');
const imageHeight = Math.round(width * 0.75);

const formatPrice = (price: number | string) => {
  if (typeof price === 'number') {
    try {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
      }).format(price);
    } catch {
      return `Rp${price.toLocaleString('id-ID')}`;
    }
  }
  return price;
};

export default function ProductDetail() {
  const router = useRouter();
  const navigation = useNavigation();
  const handleBack = () => {
    // If there's navigation history, go back. Otherwise, return to Home.
    if (typeof navigation?.canGoBack === 'function' && navigation.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };
  // Sample product data; can be replaced with params or API later
  const title = 'Kamera Mirrorless 24MP + Lensa Kit 15-45mm';
  const price = 4250000;
  const ratingValue = 4.6;
  const ratingCount = 157;
  const image = require('../assets/images/react-logo.png');

  const variants = ['Hitam', 'Putih', 'Merah'];
  const sizes = ['S', 'M', 'L', 'XL'];
  const [variant, setVariant] = useState<string>(variants[0]);
  const [size, setSize] = useState<string>(sizes[1]);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerTransparent: true, headerTitle: '', headerTintColor: colors.white }} />

      <View style={styles.container}>
        <Pressable style={styles.backButton} onPress={handleBack}>
          <Feather name="chevron-left" size={22} color={colors.white} />
        </Pressable>
        <ScrollView contentContainerStyle={{ paddingBottom: 96 }} showsVerticalScrollIndicator={false}>
          <Image source={image} style={styles.image} resizeMode="cover" />

          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>{formatPrice(price)}</Text>

            <View style={styles.ratingRow}>
              <Feather name="star" size={18} color={colors.warning} />
              <Text style={styles.ratingValue}>{ratingValue.toFixed(1)}</Text>
              <Text style={styles.ratingCount}>({ratingCount})</Text>
            </View>

            <View style={{ height: 16 }} />

            <Text style={styles.sectionLabel}>Varian</Text>
            <View style={styles.chipsRow}>
              {variants.map((v) => {
                const active = v === variant;
                return (
                  <Pressable
                    key={v}
                    style={[styles.chip, active ? styles.chipActive : styles.chipInactive]}
                    onPress={() => setVariant(v)}
                  >
                    <Text style={[styles.chipText, active ? styles.chipTextActive : styles.chipTextInactive]}>{v}</Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={{ height: 12 }} />

            <Text style={styles.sectionLabel}>Ukuran</Text>
            <View style={styles.chipsRow}>
              {sizes.map((s) => {
                const active = s === size;
                return (
                  <Pressable
                    key={s}
                    style={[styles.chip, active ? styles.chipActive : styles.chipInactive]}
                    onPress={() => setSize(s)}
                  >
                    <Text style={[styles.chipText, active ? styles.chipTextActive : styles.chipTextInactive]}>{s}</Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={{ height: 16 }} />

            <Text style={styles.sectionLabel}>Deskripsi</Text>
            <Text style={styles.description}>
              Kamera mirrorless dengan sensor 24MP, cocok untuk fotografi sehari-hari dan konten kreator. Dilengkapi lensa kit 15-45mm, stabilisasi gambar, dan konektivitas nirkabel untuk memudahkan transfer foto.
            </Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Pressable style={styles.wishlistBtn} onPress={() => setIsLiked((v) => !v)}>
            <Feather name="heart" size={20} color={isLiked ? colors.danger : colors.grayDark} />
            <Text style={[styles.wishlistText, { color: isLiked ? colors.danger : colors.grayDark }]}>Wishlist</Text>
          </Pressable>
          <Pressable style={styles.cartBtn} onPress={() => {}}>
            <Feather name="shopping-cart" size={20} color={colors.onPrimary} />
            <Text style={styles.cartText}>Tambah ke Keranjang</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.transparentBlack70,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  image: {
    width: '100%',
    height: imageHeight,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.grayDark,
    marginBottom: 6,
  },
  price: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.grayDark,
  },
  ratingCount: {
    fontSize: 14,
    color: colors.gray,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.grayDark,
    marginBottom: 8,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
  },
  chipInactive: {
    backgroundColor: colors.white,
    borderColor: colors.gray,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  chipTextInactive: {
    color: colors.grayDark,
  },
  chipTextActive: {
    color: colors.onPrimary,
  },
  description: {
    fontSize: 14,
    color: colors.grayDark,
    lineHeight: 20,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.transparentBlack10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  wishlistBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.transparentBlack10,
  },
  wishlistText: {
    fontSize: 14,
    fontWeight: '700',
  },
  cartBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.primary,
  },
  cartText: {
    color: colors.onPrimary,
    fontSize: 16,
    fontWeight: '800',
  },
});