import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CircleAvatar from '@/components/CircleAvatar';
import CustomSearch from '@/components/CustomSearch';
import CustomChipScroll from '@/components/CustomChipScroll';
import CustomProductCard from '@/components/CustomProductCard';
import colors from '../constants/colors';
import { Link, useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fetchProductsThunk } from '@/redux/slices/productSlice';
import { fetchCategoriesThunk } from '@/redux/slices/categoriesSlice';

export default function Home() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | number>('all');
  const [sortKey, setSortKey] = useState<'name_asc' | 'name_desc' | 'price_asc' | 'price_desc'>('name_asc');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items: productItems, loading: productLoading } = useAppSelector((s) => s.product);
  const { items: categoryItems, loading: catLoading } = useAppSelector((s) => s.categories);

  const categories = useMemo(() => {
    const mapped = (categoryItems || []).map((c: any) => ({
      label: c?.name ?? c?.label ?? String(c?.slug ?? c?.id ?? c?.value ?? ''),
      value: c?.slug ?? c?.id ?? c?.value ?? (c?.name ?? ''),
    }));
    return [{ label: 'Semua', value: 'all' }, ...mapped];
  }, [categoryItems]);

  const promoProducts = [
    {
      id: 'pp1',
      title: 'Kamera Mirrorless 24MP + Lensa Kit',
      price: 4250000,
      ratingValue: 4.7,
      ratingCount: 212,
      likeCount: 86,
      image: require('../../assets/images/react-logo.png'),
    },
    {
      id: 'pp2',
      title: 'Sepatu Lari Ringan Pria',
      price: 315000,
      ratingValue: 4.4,
      ratingCount: 98,
      likeCount: 45,
      image: require('../../assets/images/icon.png'),
    },
    {
      id: 'pp3',
      title: 'Headphone Wireless ANC 30 Jam',
      price: 899000,
      ratingValue: 4.6,
      ratingCount: 157,
      likeCount: 63,
      image: require('../../assets/images/default-logo.png'),
    },
    {
      id: 'pp4',
      title: 'Blender Dapur 1.5L 500W',
      price: 275000,
      ratingValue: 4.3,
      ratingCount: 64,
      likeCount: 29,
      image: require('../../assets/images/partial-react-logo.png'),
    },
    {
      id: 'pp5',
      title: 'Smartwatch Health Tracker',
      price: 599000,
      ratingValue: 4.5,
      ratingCount: 120,
      likeCount: 52,
      image: require('../../assets/images/android-icon-foreground.png'),
    },
  ];

  useEffect(() => {
    dispatch(fetchProductsThunk());
    dispatch(fetchCategoriesThunk());
  }, [dispatch]);

  const displayPromo = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q ? promoProducts.filter((p) => p.title.toLowerCase().includes(q)) : promoProducts.slice();
    const sorted = filtered.sort((a, b) => {
      switch (sortKey) {
        case 'name_asc':
          return a.title.localeCompare(b.title);
        case 'name_desc':
          return b.title.localeCompare(a.title);
        case 'price_asc':
          return Number(a.price) - Number(b.price);
        case 'price_desc':
          return Number(b.price) - Number(a.price);
        default:
          return 0;
      }
    });
    return sorted;
  }, [promoProducts, query, sortKey]);

  const displayPopular = useMemo(() => {
    const q = query.trim().toLowerCase();
    const raw = Array.isArray(productItems) ? productItems : [];
    const rawFiltered = category === 'all'
      ? raw
      : raw.filter((p: any) => {
          const v = String(category).toLowerCase();
          const cands = [p?.category, p?.category_id, p?.categoryId, p?.category_name, p?.categoryName, p?.category_slug, p?.categorySlug];
          return cands.some((f) => String(f ?? '').toLowerCase() === v);
        });
    const mappedFromStore = rawFiltered.map((p: any) => ({
      id: p.id,
      title: p.name ?? p.title ?? 'Produk',
      price: Number(p.base_price ?? p.price ?? 0),
      image: require('../../assets/images/default-logo.png'),
      ratingValue: 4.0,
      ratingCount: 0,
      likeCount: 0,
    }));
    const source = mappedFromStore.length ? mappedFromStore : [
      { id: 'pop1', title: 'Speaker Bluetooth 20W Bass Boost', price: 349000, image: require('../../assets/images/android-icon-background.png'), ratingValue: 4.4, ratingCount: 230, likeCount: 90 },
      { id: 'pop2', title: 'Mouse Wireless Ergonomis', price: 189000, image: require('../../assets/images/android-icon-monochrome.png'), ratingValue: 4.3, ratingCount: 175, likeCount: 70 },
      { id: 'pop3', title: 'Router WiFi Dual Band AC1200', price: 475000, image: require('../../assets/images/splash-icon.png'), ratingValue: 4.2, ratingCount: 142, likeCount: 51 },
    ];
    const filtered = q ? source.filter((p) => p.title.toLowerCase().includes(q)) : source.slice();
    const sorted = filtered.sort((a, b) => {
      switch (sortKey) {
        case 'name_asc':
          return a.title.localeCompare(b.title);
        case 'name_desc':
          return b.title.localeCompare(a.title);
        case 'price_asc':
          return Number(a.price) - Number(b.price);
        case 'price_desc':
          return Number(b.price) - Number(a.price);
        default:
          return 0;
      }
    });
    return sorted;
  }, [productItems, query, sortKey, category]);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.leftCol}>
          <Text style={styles.location}>Jakarta, Indonesia</Text>
          <Text style={styles.name}>Hi, Andi</Text>
        </View>
        <View style={styles.rightCol}>
          <CircleAvatar
            source={require('../../assets/images/icon.png')}
            size={48}
            backgroundColor={colors.surface}
          />
        </View>
      </View>

      <View style={styles.searchWrap}>
        <CustomSearch
          value={query}
          onChangeText={setQuery}
          placeholder="Cari produk..."
          sortingOptions={[
            { key: 'name_asc', label: 'Nama (A-Z)' },
            { key: 'name_desc', label: 'Nama (Z-A)' },
            { key: 'price_asc', label: 'Harga Termurah' },
            { key: 'price_desc', label: 'Harga Termahal' },
          ]}
          selectedSortKey={sortKey}
          onChangeSort={(key) => setSortKey(key as any)}
        />
        <View style={{ height: 12 }} />
        <CustomChipScroll
          items={categories}
          selected={category}
          onSelect={(val) => setCategory(val)}
        />
      </View>

      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Promo Hari Ini</Text>
            <Link href="/search" style={styles.seeAll}>See All</Link>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {displayPromo.slice(0, 5).map((p) => (
              <CustomProductCard
                key={p.id}
                image={p.image}
                title={p.title}
                price={p.price}
                ratingValue={p.ratingValue}
                ratingCount={p.ratingCount}
                likeCount={p.likeCount}
                containerStyle={{ width: 170, marginRight: 12 }}
                onPressCart={() => {}}
                onPressLike={() => {}}
                onPressCard={() => router.push({ pathname: '/productDetail', params: { id: String(p.id) } })}
              />
            ))}
          </ScrollView>

          <View style={{ height: 16 }} />

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Produk Populer</Text>
          </View>

          <View style={styles.verticalList}>
            {productLoading && (
              <>
                <View style={{ width: '48%', height: 200, marginBottom: 12, backgroundColor: '#eee', borderRadius: 12 }} />
                <View style={{ width: '48%', height: 200, marginBottom: 12, backgroundColor: '#eee', borderRadius: 12 }} />
                <View style={{ width: '48%', height: 200, marginBottom: 12, backgroundColor: '#eee', borderRadius: 12 }} />
                <View style={{ width: '48%', height: 200, marginBottom: 12, backgroundColor: '#eee', borderRadius: 12 }} />
              </>
            )}
            {!productLoading && displayPopular.map((p) => (
              <CustomProductCard
                key={p.id}
                image={p.image}
                title={p.title}
                price={p.price}
                ratingValue={p.ratingValue}
                ratingCount={p.ratingCount}
                likeCount={p.likeCount}
                containerStyle={{ width: '48%', marginBottom: 12 }}
                onPressCart={() => {}}
                onPressLike={() => {}}
                onPressCard={() => router.push({ pathname: '/productDetail', params: { id: String(p.id) } })}
              />
            ))}
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchWrap: {
    marginBottom: 16,
  },
  leftCol: {
    flexDirection: 'column',
    gap: 4,
  },
  rightCol: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  location: {
    fontSize: 14,
    color: colors.gray,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.grayDark,
  },
  content: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.grayDark,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  horizontalList: {
    paddingHorizontal: 4,
  },
  verticalList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});