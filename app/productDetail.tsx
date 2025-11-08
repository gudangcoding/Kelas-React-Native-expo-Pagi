import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, ScrollView, Pressable, Dimensions, ActivityIndicator } from 'react-native';
import { Stack, useRouter, useNavigation, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import colors from './constants/colors';
import * as api from '@/lib/api';
import { useAppDispatch } from '@/redux/store';
import { addItem } from '@/redux/slices/cartSlice';

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
  const params = useLocalSearchParams();
  const dispatch = useAppDispatch();
  const productId = useMemo(() => (params?.id ? String(params.id) : null), [params?.id]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<any | null>(null);
  const [variantsData, setVariantsData] = useState<any[]>([]);

  const handleBack = () => {
    // If there's navigation history, go back. Otherwise, return to Home.
    if (typeof navigation?.canGoBack === 'function' && navigation.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };
  const image = require('../assets/images/react-logo.png');

  // Variants & sizes default until API returns
  const [variant, setVariant] = useState<string>('Default');
  const [size, setSize] = useState<string>('M');
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      if (!productId) return;
      setLoading(true);
      setError(null);
      try {
        const [pRes, vRes] = await Promise.all([
          api.getProductById(productId as string),
          api.getProductVariants(productId as string),
        ]);
        if (mounted) {
          setProduct((pRes as any)?.data ?? pRes?.data ?? null);
          const vData = (vRes as any)?.data ?? vRes?.data ?? [];
          setVariantsData(Array.isArray(vData) ? vData : []);
          // preselect variant/size if available
          if (Array.isArray(vData) && vData.length > 0) {
            const first = vData[0];
            const vName = first?.option_name ?? 'Default';
            setVariant(String(vName));
            const val = first?.values?.[0]?.value ?? 'M';
            setSize(String(val));
          }
        }
      } catch (err: any) {
        if (mounted) setError(err?.message ?? 'Gagal memuat produk');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    run();
    return () => {
      mounted = false;
    };
  }, [productId]);

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
            {loading && (
              <View style={{ paddingVertical: 8 }}>
                <ActivityIndicator size="small" color={colors.primary} />
              </View>
            )}
            {error && (
              <Text style={{ color: colors.danger, marginBottom: 8 }}>{error}</Text>
            )}
            <Text style={styles.title}>{product?.title ?? product?.name ?? 'Produk'}</Text>
            <Text style={styles.price}>{formatPrice(product?.price ?? 0)}</Text>

            <View style={styles.ratingRow}>
              <Feather name="star" size={18} color={colors.warning} />
              <Text style={styles.ratingValue}>{Number(product?.rating ?? 4.6).toFixed(1)}</Text>
              <Text style={styles.ratingCount}>({product?.rating_count ?? 157})</Text>
            </View>

            <View style={{ height: 16 }} />

            <Text style={styles.sectionLabel}>Varian</Text>
            <View style={styles.chipsRow}>
              {(variantsData.length > 0
                ? variantsData.map((vd) => String(vd?.option_name ?? 'Default'))
                : ['Default']
              ).map((v) => {
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
              {(variantsData.find((vd) => String(vd?.option_name ?? 'Default') === variant)?.values?.map((val: any) => String(val?.value)) ?? ['S', 'M', 'L', 'XL']).map((s: string) => {
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
              {product?.description ?? 'Tidak ada deskripsi produk.'}
            </Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Pressable style={styles.wishlistBtn} onPress={() => setIsLiked((v) => !v)}>
            <Feather name="heart" size={20} color={isLiked ? colors.danger : colors.grayDark} />
            <Text style={[styles.wishlistText, { color: isLiked ? colors.danger : colors.grayDark }]}>Wishlist</Text>
          </Pressable>
          <Pressable
            style={styles.cartBtn}
            onPress={() => {
              if (!productId) return;
              const name = String(product?.title ?? product?.name ?? 'Produk');
              const price = Number(product?.price ?? 0);
              dispatch(addItem({ id: productId, name, price, qty: 1, variant, size }));
              router.push('/cart');
            }}
          >
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