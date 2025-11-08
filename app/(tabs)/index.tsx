import CircleAvatar from '@/components/CircleAvatar';
import CustomChipScroll from '@/components/CustomChipScroll';
import CustomProductCard from '@/components/CustomProductCard';
import CustomSearch from '@/components/CustomSearch';
import { fetchCategoriesThunk } from '@/redux/slices/categoriesSlice';
import { fetchProductsThunk } from '@/redux/slices/productSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';

export default function Home() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | number>('all');
  const [sortKey, setSortKey] = useState<'name_asc' | 'name_desc' | 'price_asc' | 'price_desc'>('name_asc');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items: productItems, loading: productLoading } = useAppSelector((s) => s.product);
  const { items: categoryItems, loading: catLoading } = useAppSelector((s) => s.categories);

  const categories = useMemo(() => {
    const raw = Array.isArray(categoryItems)
      ? categoryItems
      : Array.isArray((categoryItems as any)?.data)
      ? (categoryItems as any).data
      : [];
    const mapped = raw.map((c: any) => ({
      label: c?.name ?? c?.label ?? String(c?.slug ?? c?.id ?? c?.value ?? ''),
      value: c?.slug ?? c?.id ?? c?.value ?? (c?.name ?? ''),
    }));
    return [{ label: 'Semua', value: 'all' }, ...mapped];
  }, [categoryItems]);

  const promoProducts = useMemo(() => {
    const raw = Array.isArray(productItems) ? productItems : [];
    const sortedRaw = raw.slice().sort((a: any, b: any) => {
      const getTime = (x: any) => {
        const t = x?.created_at ?? x?.createdAt ?? x?.updated_at ?? x?.updatedAt ?? null;
        const n = t ? Date.parse(String(t)) : NaN;
        return Number.isNaN(n) ? 0 : n;
      };
      const tb = getTime(b);
      const ta = getTime(a);
      if (tb !== ta) return tb - ta; // terbaru duluan
      const ib = Number(b?.id);
      const ia = Number(a?.id);
      if (!Number.isNaN(ib) && !Number.isNaN(ia)) return ib - ia;
      return 0;
    });
    const mapped = sortedRaw.map((p: any) => ({
      id: p.id,
      title: p.name ?? p.title ?? 'Produk',
      price: Number(p.base_price ?? p.price ?? 0),
      ratingValue: Number(p.rating ?? p.ratingValue ?? 0),
      ratingCount: Number(p.rating_count ?? p.ratingCount ?? 0),
      likeCount: Number(p.like_count ?? p.likeCount ?? 0),
      image: require('../../assets/images/default-logo.png'),
    }));
    // Ambil sebagian untuk ditampilkan sebagai promo
    return mapped.slice(0, 10);
  }, [productItems]);

  useEffect(() => {
    dispatch(fetchProductsThunk());
    dispatch(fetchCategoriesThunk());
  }, [dispatch]);

  const displayPromo = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q ? promoProducts.filter((p) => p.title.toLowerCase().includes(q)) : promoProducts.slice();
    // Sudah disort berdasar waktu terbaru di promoProducts; tidak perlu sorter lain
    return filtered;
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
            <Text style={styles.sectionTitle}>Produk Terbaru</Text>
            <Link href="/search" style={styles.seeAll}>See All</Link>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {productLoading && (
              <>
                <View style={{ width: 170, height: 200, marginRight: 12, backgroundColor: '#eee', borderRadius: 12 }} />
                <View style={{ width: 170, height: 200, marginRight: 12, backgroundColor: '#eee', borderRadius: 12 }} />
                <View style={{ width: 170, height: 200, marginRight: 12, backgroundColor: '#eee', borderRadius: 12 }} />
                <View style={{ width: 170, height: 200, marginRight: 12, backgroundColor: '#eee', borderRadius: 12 }} />
              </>
            )}
            {!productLoading && displayPromo.slice(0, 5).length === 0 && (
              <View style={{ paddingHorizontal: 8 }}>
                <Text style={{ color: colors.gray }}>Tidak ada produk terbaru.</Text>
              </View>
            )}
            {!productLoading && displayPromo.slice(0, 5).map((p) => (
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
    padding: 0,
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