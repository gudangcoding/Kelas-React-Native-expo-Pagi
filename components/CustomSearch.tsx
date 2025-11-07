import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from '../app/constants/colors';

interface CustomSearchProps {
  value: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  onPressFilter?: () => void;
  // Reusable sorting dropdown inside the component
  sortingOptions?: { key: string; label: string }[];
  selectedSortKey?: string;
  onChangeSort?: (key: string) => void;
}

const CustomSearch: React.FC<CustomSearchProps> = ({
  value,
  onChangeText,
  placeholder = 'Cari...',
  onPressFilter,
  sortingOptions,
  selectedSortKey,
  onChangeSort,
}) => {
  const [sortOpen, setSortOpen] = useState(false);

  const handlePressFilter = () => {
    if (sortingOptions && sortingOptions.length > 0) {
      setSortOpen((v) => !v);
    } else {
      onPressFilter && onPressFilter();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.gray}
        style={styles.input}
      />
      <Pressable style={styles.filterButton} onPress={handlePressFilter}>
        <Feather name="filter" size={20} color={colors.white} />
      </Pressable>
      {sortOpen && sortingOptions && sortingOptions.length > 0 && (
        <View style={styles.sortDropdown}>
          <Text style={styles.sortTitle}>Urutkan</Text>
          <View style={{ height: 8 }} />
          <View>
            {sortingOptions.map((opt) => (
              <Pressable
                key={opt.key}
                style={styles.sortItem}
                onPress={() => {
                  onChangeSort && onChangeSort(opt.key);
                  setSortOpen(false);
                }}
              >
                <Text
                  style={[
                    styles.sortText,
                    selectedSortKey === opt.key ? styles.sortTextActive : null,
                  ]}
                >
                  {opt.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 12,
    paddingLeft: 12,
    paddingRight: 48, // space for filter icon
    backgroundColor: colors.white,
    fontSize: 16,
  },
  filterButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
  },
  sortDropdown: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.transparentBlack10,
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 8,
    overflow: 'hidden',
  },
  sortTitle: {
    fontSize: 14,
    color: colors.gray,
    fontWeight: '600',
    paddingHorizontal: 12,
  },
  sortItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: colors.transparentBlack10,
  },
  sortText: {
    fontSize: 14,
    color: colors.grayDark,
    fontWeight: '600',
  },
  sortTextActive: {
    color: colors.primary,
  },
});

export default CustomSearch;