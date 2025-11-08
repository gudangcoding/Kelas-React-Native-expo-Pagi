import React, { useMemo } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Stack, useRouter, useNavigation } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import colors from '@/app/constants/colors';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { increment, decrement, removeItem } from '@/redux/slices/cartSlice';

type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
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

export default function Cart() {
  const router = useRouter();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const handleBack = () => {
    if (typeof navigation?.canGoBack === 'function' && navigation.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  const items = useAppSelector((s) => s.cart.items);

  const total = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items]);

  // kontrol qty akan mempertimbangkan kombinasi id+variant+size

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerTransparent: true, headerTitle: '', headerTintColor: colors.white }} />
      <View style={styles.container}>
        <Pressable style={styles.backButton} onPress={handleBack}>
          <Feather name="chevron-left" size={22} color={colors.white} />
        </Pressable>

        <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Keranjang Belanja</Text>
          </View>

          {items.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{formatPrice(item.price)}</Text>
              </View>
              <View style={styles.qtyControls}>
                <Pressable
                  style={styles.qtyBtn}
                  onPress={() =>
                    dispatch(
                      decrement({ id: item.id, variant: item.variant ?? null, size: item.size ?? null })
                    )
                  }
                >
                  <Feather name="minus" size={16} color={colors.grayDark} />
                </Pressable>
                <Text style={styles.qtyValue}>{item.qty}</Text>
                <Pressable
                  style={styles.qtyBtn}
                  onPress={() =>
                    dispatch(
                      increment({ id: item.id, variant: item.variant ?? null, size: item.size ?? null })
                    )
                  }
                >
                  <Feather name="plus" size={16} color={colors.grayDark} />
                </Pressable>
                <Pressable
                  style={[styles.qtyBtn, { marginLeft: 6 }]}
                  onPress={() =>
                    dispatch(
                      removeItem({ id: item.id, variant: item.variant ?? null, size: item.size ?? null })
                    )
                  }
                >
                  <Feather name="trash-2" size={16} color={colors.grayDark} />
                </Pressable>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>Total Belanja</Text>
            <Text style={styles.totalValue}>{formatPrice(total)}</Text>
          </View>
          <Pressable
            style={styles.payBtn}
            onPress={() =>
              router.push({
                pathname: '/payment',
                params: { total: String(total), items: JSON.stringify(items) },
              })
            }
          >
            <Feather name="credit-card" size={18} color={colors.onPrimary} />
            <Text style={styles.payText}>Bayar</Text>
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
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.grayDark,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.transparentBlack10,
  },
  itemInfo: {
    flex: 1,
    paddingRight: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.grayDark,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },
  qtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.transparentBlack10,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyValue: {
    width: 28,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: colors.grayDark,
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
  payBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.primary,
  },
  payText: {
    color: colors.onPrimary,
    fontSize: 16,
    fontWeight: '800',
  },
});