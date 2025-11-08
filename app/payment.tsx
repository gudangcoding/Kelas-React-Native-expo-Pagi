import { Feather } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import colors from './constants/colors';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { createOrderThunk } from '@/redux/slices/orderSlice';
import { fetchCouriersThunk } from '@/redux/slices/shipmentSlice';

type Option = { key: string; label: string };

const shippingOptions: Option[] = [
  { key: 'jne', label: 'JNE' },
  { key: 'tiki', label: 'TIKI' },
  { key: 'sicepat', label: 'SiCepat' },
  { key: 'anteraja', label: 'Anter Aja' },
];

const paymentOptions: Option[] = [
  { key: 'va_bca', label: 'Virtual Akun BCA' },
  { key: 'va_bni', label: 'Virtual Akun BNI' },
  { key: 'va_mandiri', label: 'Virtual Akun Mandiri' },
  { key: 'cc', label: 'Kartu Kredit' },
];

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

export default function Payment() {
  const router = useRouter();
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const dispatch = useAppDispatch();
  const { loading: orderLoading, error: orderError, lastOrder } = useAppSelector((s) => s.order);
  const cartItems = useAppSelector((s) => s.cart.items);
  const couriers = useAppSelector((s) => s.shipment.couriers);
  const total = useMemo(() => {
    const t = Number(params?.total);
    return Number.isFinite(t) && t > 0 ? t : 0;
  }, [params?.total]);

  const [shippingOpen, setShippingOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [shipping, setShipping] = useState<Option>(shippingOptions[0]);
  const [payment, setPayment] = useState<Option>(paymentOptions[0]);

  const itemsFromParams = useMemo(() => {
    try {
      const raw = params?.items ? String(params.items) : '[]';
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [params?.items]);

  const items = cartItems && cartItems.length > 0 ? cartItems : itemsFromParams;

  React.useEffect(() => {
    // Ambil daftar kurir jika belum ada
    if (!couriers || couriers.length === 0) {
      dispatch(fetchCouriersThunk());
    }
  }, [dispatch]);

  const handleBack = () => {
    if (typeof navigation?.canGoBack === 'function' && navigation.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  const selectShipping = (opt: Option) => {
    setShipping(opt);
    setShippingOpen(false);
  };

  const selectPayment = (opt: Option) => {
    setPayment(opt);
    setPaymentOpen(false);
  };

  const onConfirm = async () => {
    // payload mengikuti format API doc
    const payload = {
      origin: 'Jakarta',
      destination: 'Bandung',
      weight: 1000,
      courier: shipping.key,
      items: items.map((it: any) => ({ id: Number(it.id), product_variant_id: null, quantity: Number(it.qty) })),
    };
    await dispatch(createOrderThunk(payload));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerTransparent: true, headerTitle: '', headerTintColor: colors.white }} />
      <View style={styles.container}>
        <Pressable style={styles.backButton} onPress={handleBack}>
          <Feather name="chevron-left" size={22} color={colors.white} />
        </Pressable>

        <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Pembayaran</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Total Bayar</Text>
            <Text style={styles.totalValue}>{formatPrice(total)}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Pilih Pengiriman</Text>
            <Pressable style={styles.selectBox} onPress={() => setShippingOpen((v) => !v)}>
              <Text style={styles.selectText}>{shipping.label}</Text>
              <Feather name={shippingOpen ? 'chevron-up' : 'chevron-down'} size={18} color={colors.grayDark} />
            </Pressable>
            {shippingOpen && (
              <View style={styles.dropdown}>
                {(couriers && couriers.length > 0 ? couriers.map((c: any) => ({ key: String(c?.code ?? c?.key ?? c), label: String(c?.name ?? c?.label ?? c) })) : shippingOptions).map((opt) => (
                  <Pressable key={opt.key} style={styles.dropdownItem} onPress={() => selectShipping(opt)}>
                    <Text style={styles.dropdownText}>{opt.label}</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Pilih Pembayaran</Text>
            <Pressable style={styles.selectBox} onPress={() => setPaymentOpen((v) => !v)}>
              <Text style={styles.selectText}>{payment.label}</Text>
              <Feather name={paymentOpen ? 'chevron-up' : 'chevron-down'} size={18} color={colors.grayDark} />
            </Pressable>
            {paymentOpen && (
              <View style={styles.dropdown}>
                {paymentOptions.map((opt) => (
                  <Pressable key={opt.key} style={styles.dropdownItem} onPress={() => selectPayment(opt)}>
                    <Text style={styles.dropdownText}>{opt.label}</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>Total Bayar</Text>
            <Text style={styles.totalFooterValue}>{formatPrice(total)}</Text>
          </View>
          <Pressable style={[styles.confirmBtn, orderLoading && { opacity: 0.7 }]} onPress={onConfirm} disabled={orderLoading}>
            <Feather name="check-circle" size={18} color={colors.onPrimary} />
            <Text style={styles.confirmText}>Konfirmasi</Text>
          </Pressable>
        </View>
        {orderError && (
          <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
            <Text style={{ color: colors.danger }}>{orderError}</Text>
          </View>
        )}
        {lastOrder && (
          <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
            <Text style={{ color: colors.success }}>Order dibuat.</Text>
          </View>
        )}
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
  section: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.grayDark,
    marginBottom: 8,
  },
  totalValue: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.primary,
  },
  selectBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.transparentBlack10,
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  selectText: {
    fontSize: 16,
    color: colors.grayDark,
    fontWeight: '600',
  },
  dropdown: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.transparentBlack10,
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.transparentBlack10,
  },
  dropdownText: {
    fontSize: 16,
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
  totalFooterValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.grayDark,
  },
  confirmBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.success,
  },
  confirmText: {
    color: colors.onPrimary,
    fontSize: 16,
    fontWeight: '800',
  },
});