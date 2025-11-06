import React from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from '../app/constants/colors';

interface CustomSearchProps {
  value: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  onPressFilter?: () => void;
}

const CustomSearch: React.FC<CustomSearchProps> = ({
  value,
  onChangeText,
  placeholder = 'Cari...',
  onPressFilter,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.gray}
        style={styles.input}
      />
      <Pressable style={styles.filterButton} onPress={onPressFilter}>
        <Feather name="filter" size={20} color={colors.white} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 48,
    position: 'relative',
  },
  input: {
    width: '100%',
    height: '100%',
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
    top: '50%',
    transform: [{ translateY: -16 }],
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
});

export default CustomSearch;