import React, { useMemo, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { Stack, useRouter, useNavigation } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import CustomProductCard from '@/components/CustomProductCard';
import CustomSearch from '@/components/CustomSearch';
import colors from './constants/colors';

type WLItem = {
  id: string;
  title: string;
  price: number;
  ratingValue: number;
  ratingCount: number;
  likeCount: number;
  image: any;
};

const formatPrice = (price: number) => {
  try {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(price);
  } catch {
    return `Rp${price.toLocaleString('id-ID')}`;
  }
};

export default function Favorite() {
  const router = useRouter();
  const navigation = useNavigation();
  const handleBack = () => {
    if (typeof navigation?.canGoBack === 'function' && navigation.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  const [items] = useState<WLItem[]>([
    { id: 'w1', title: 'Kamera Mirrorless 24MP', price: 4250000, ratingValue: 4.7, ratingCount: 212, likeCount: 86, image: require('../assets/images/react-logo.png') },
    { id: 'w2', title: 'Sepatu Lari Ringan', price: 315000, ratingValue: 4.4, ratingCount: 98, likeCount: 45, image: require('../assets/images/icon.png') },
    { id: 'w3', title: 'Headphone Wireless ANC', price: 899000, ratingValue: 4.6, ratingCount: 157, likeCount: 63, image: require('../assets/images/default-logo.png') },
    { id: 'w4', title: 'Smartwatch Health Tracker', price: 599000, ratingValue: 4.5, ratingCount: 120, likeCount: 52, image: require('../assets/images/android-icon-foreground.png') },
    { id: 'w5', title: 'Speaker Bluetooth 20W', price: 349000, ratingValue: 4.4, ratingCount: 230, likeCount: 90, image: require('../assets/images/android-icon-background.png') },
    { id: 'w6', title: 'Mouse Wireless Ergonomis', price: 189000, ratingValue: 4.3, ratingCount: 175, likeCount: 70, image: require('../assets/images/android-icon-monochrome.png') },
  ]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<'name_asc' | 'name_desc' | 'price_asc' | 'price_desc'>('name_asc');

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalSelected = useMemo(() => {
    return items.reduce((sum, it) => (selected.has(it.id) ? sum + it.price : sum), 0);
  }, [items, selected]);

  const displayItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q ? items.filter((it) => it.title.toLowerCase().includes(q)) : items.slice();
    const sorted = filtered.sort((a, b) => {
      switch (sortKey) {
        case 'name_asc':
          return a.title.localeCompare(b.title);
        case 'name_desc':
          return b.title.localeCompare(a.title);
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        default:
          return 0;
      }
    });
    return sorted;
  }, [items, query, sortKey]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerTransparent: true, headerTitle: '', headerTintColor: colors.white }} />
      <View style={styles.container}>
        <Pressable style={styles.backButton} onPress={handleBack}>
          <Feather name="chevron-left" size={22} color={colors.white} />
        </Pressable>

        <View style={styles.header}> 
          <Text style={styles.headerTitle}>Wishlist</Text>
        </View>
        <View style={styles.searchWrap}>
          <CustomSearch
            value={query}
            onChangeText={setQuery}
            placeholder="Cari di wishlist..."
            sortingOptions={[
              { key: 'name_asc', label: 'Nama (A-Z)' },
              { key: 'name_desc', label: 'Nama (Z-A)' },
              { key: 'price_asc', label: 'Harga Termurah' },
              { key: 'price_desc', label: 'Harga Termahal' },
            ]}
            selectedSortKey={sortKey}
            onChangeSort={(key) => setSortKey(key as any)}
          />
        </View>

        <FlatList
          data={displayItems}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 120, paddingTop: 8 }}
          columnWrapperStyle={{ gap: 12, paddingHorizontal: 16 }}
          renderItem={({ item }) => {
            const isChecked = selected.has(item.id);
            return (
              <View style={styles.cardWrap}>
                <CustomProductCard
                  image={item.image}
                  title={item.title}
                  price={item.price}
                  ratingValue={item.ratingValue}
                  ratingCount={item.ratingCount}
                  likeCount={item.likeCount}
                  containerStyle={{ width: '100%' }}
                  onPressCard={() => router.push('/productDetail')}
                  onPressCart={() => {}}
                  onPressLike={() => {}}
                />
                <Pressable style={[styles.checkbox, isChecked ? styles.checkboxActive : styles.checkboxInactive]} onPress={() => toggleSelect(item.id)}>
                  <Feather name={isChecked ? 'check-square' : 'square'} size={18} color={isChecked ? colors.onPrimary : colors.grayDark} />
                </Pressable>
              </View>
            );
          }}
        />

        <View style={styles.footer}>
          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>Total Harga</Text>
            <Text style={styles.totalValue}>{formatPrice(totalSelected)}</Text>
          </View>
          <Pressable style={styles.cartBtn} onPress={() => router.push('/cart')}>
            <Feather name="shopping-cart" size={18} color={colors.onPrimary} />
            <Text style={styles.cartText}>Keranjang</Text>
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
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  searchWrap: {
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.grayDark,
  },
  sortDropdown: {
    borderWidth: 1,
    borderColor: colors.transparentBlack10,
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
  },
  sortItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.transparentBlack10,
  },
  sortText: {
    fontSize: 14,
    color: colors.grayDark,
    fontWeight: '600',
  },
  cardWrap: {
    position: 'relative',
    flex: 1,
  },
  checkbox: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.transparentBlack10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  checkboxInactive: {
    backgroundColor: colors.white,
  },
  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
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
  totalBox: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 12,
    color: colors.gray,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.grayDark,
  },
  cartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
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