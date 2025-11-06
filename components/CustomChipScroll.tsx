import React from 'react';
import { ScrollView, Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import colors from '../app/constants/colors';

interface CustomChipScrollProps<T extends string | number> {
  items: { label: string; value: T }[];
  selected?: T;
  onSelect?: (value: T) => void;
  containerStyle?: ViewStyle;
}

function CustomChipScroll<T extends string | number>({
  items,
  selected,
  onSelect,
  containerStyle,
}: CustomChipScrollProps<T>) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.container, containerStyle]}
    >
      {items.map((item) => {
        const isActive = item.value === selected;
        return (
          <Pressable
            key={String(item.value)}
            style={[styles.chip, isActive ? styles.chipActive : styles.chipInactive]}
            onPress={() => onSelect?.(item.value)}
          >
            <Text style={[styles.chipText, isActive ? styles.chipTextActive : styles.chipTextInactive]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
    gap: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 8,
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
});

export default CustomChipScroll;