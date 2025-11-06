import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CircleAvatar from '@/components/CircleAvatar';
import CustomSearch from '@/components/CustomSearch';
import CustomChipScroll from '@/components/CustomChipScroll';
import colors from '../constants/colors';

export default function Home() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | number>('all');

  const categories = [
    { label: 'Semua', value: 'all' },
    { label: 'Elektronik', value: 'elec' },
    { label: 'Fashion', value: 'fashion' },
    { label: 'Makanan', value: 'food' },
    { label: 'Olahraga', value: 'sport' },
    { label: 'Kecantikan', value: 'beauty' },
    { label: 'Rumah Tangga', value: 'home' },
  ];

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
          onPressFilter={() => {
            // TODO: open filter modal or navigate
          }}
        />
        <View style={{ height: 12 }} />
        <CustomChipScroll
          items={categories}
          selected={category}
          onSelect={(val) => setCategory(val)}
        />
      </View>

      <View style={styles.content}>
        <Text>Konten beranda di sini.</Text>
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
});