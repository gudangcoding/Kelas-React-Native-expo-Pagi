import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import CustomProductCard from '@/components/CustomProductCard';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { searchProductsThunk } from '@/redux/slices/productSlice';

export default function Search() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { searchResults, loading } = useAppSelector((s) => s.product);

  useEffect(() => {
    const t = setTimeout(() => {
      const q = query.trim();
      if (q) dispatch(searchProductsThunk(q));
    }, 400);
    return () => clearTimeout(t);
  }, [query, dispatch]);

  const display = useMemo(() => {
    const q = query.trim().toLowerCase();
    const mapped = (searchResults || []).map((p: any) => ({
      id: p.id,
      title: p.name ?? p.title ?? 'Produk',
      price: Number(p.base_price ?? p.price ?? 0),
    }));
    const src = mapped.length ? mapped : [];
    return q ? src.filter((p) => p.title.toLowerCase().includes(q)) : src;
  }, [searchResults, query]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#fff', '#f0f0f0']}
        style={styles.content}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Search</Text>
          <View style={styles.searchContainer}>
            <Feather name="search" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              placeholder="Cari produk..."
              style={styles.searchInput}
              placeholderTextColor="#666"
              value={query}
              onChangeText={setQuery}
            />
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultText}>{loading ? 'Mencari...' : `Hasil: ${display.length}`}</Text>
          </View>

          <View style={styles.gridList}>
            {loading && (
              <>
                <View style={{ width: '48%', height: 200, marginBottom: 12, backgroundColor: '#eee', borderRadius: 12 }} />
                <View style={{ width: '48%', height: 200, marginBottom: 12, backgroundColor: '#eee', borderRadius: 12 }} />
                <View style={{ width: '48%', height: 200, marginBottom: 12, backgroundColor: '#eee', borderRadius: 12 }} />
                <View style={{ width: '48%', height: 200, marginBottom: 12, backgroundColor: '#eee', borderRadius: 12 }} />
              </>
            )}
            {!loading && display.map((p) => (
              <CustomProductCard
                key={p.id}
                image={require('../../assets/images/default-logo.png')}
                title={p.title}
                price={p.price}
                containerStyle={{ width: '48%', marginBottom: 12 }}
                onPressCart={() => {}}
                onPressLike={() => {}}
                onPressCard={() => router.push({ pathname: '/productDetail', params: { id: String(p.id) } })}
              />
            ))}
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  header: {
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  resultHeader: {
    marginTop: 12,
    marginBottom: 8,
  },
  resultText: {
    fontSize: 14,
    color: '#666',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 15,
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  gridList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 12,
  },
});