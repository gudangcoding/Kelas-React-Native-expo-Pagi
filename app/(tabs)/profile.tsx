import React, { useMemo, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import colors from '@/app/constants/colors';
import CustomChipScroll from '@/components/CustomChipScroll';

type RangeKey = '7d' | '30d' | '12m';

interface OrderItem {
  id: string;
  date: number;
  amount: number;
  items: number;
  returned: number;
}

interface ShipmentItem {
  id: string;
  status: 'dikemas' | 'dipickup' | 'dikirim' | 'selesai' | 'komplain';
}

export default function ProfilePage() {
  const router = useRouter();
  const [range, setRange] = useState<RangeKey>('30d');

  const now = Date.now();
  const orders: OrderItem[] = [
    { id: 'o1', date: now - 2 * 24 * 3600 * 1000, amount: 250000, items: 3, returned: 0 },
    { id: 'o2', date: now - 6 * 24 * 3600 * 1000, amount: 480000, items: 5, returned: 1 },
    { id: 'o3', date: now - 20 * 24 * 3600 * 1000, amount: 1250000, items: 2, returned: 0 },
    { id: 'o4', date: now - 80 * 24 * 3600 * 1000, amount: 3250000, items: 10, returned: 2 },
    { id: 'o5', date: now - 200 * 24 * 3600 * 1000, amount: 950000, items: 4, returned: 0 },
  ];

  const shipments: ShipmentItem[] = [
    { id: 's1', status: 'dikemas' },
    { id: 's2', status: 'dikemas' },
    { id: 's3', status: 'dipickup' },
    { id: 's4', status: 'dikirim' },
    { id: 's5', status: 'dikirim' },
    { id: 's6', status: 'selesai' },
    { id: 's7', status: 'selesai' },
    { id: 's8', status: 'komplain' },
  ];

  const claimedBonuses = [
    { key: 'Diskon Produk', icon: 'tag' as const, count: 5 },
    { key: 'Ongkir', icon: 'truck' as const, count: 3 },
    { key: 'Flash Sale', icon: 'zap' as const, count: 2 },
    { key: 'Promo Event', icon: 'gift' as const, count: 1 },
  ];

  const cartTotal = 4;
  const wishlistTotal = 12;

  const rangeStart = useMemo(() => {
    if (range === '7d') return now - 7 * 24 * 3600 * 1000;
    if (range === '30d') return now - 30 * 24 * 3600 * 1000;
    return now - 365 * 24 * 3600 * 1000;
  }, [range, now]);

  const filteredOrders = useMemo(() => orders.filter((o) => o.date >= rangeStart), [orders, rangeStart]);
  const totalSpent = useMemo(() => filteredOrders.reduce((sum, o) => sum + o.amount, 0), [filteredOrders]);
  const totalItems = useMemo(() => filteredOrders.reduce((sum, o) => sum + o.items, 0), [filteredOrders]);
  const returnedItems = useMemo(() => filteredOrders.reduce((sum, o) => sum + o.returned, 0), [filteredOrders]);

  const shipmentCounts = useMemo(() => {
    const c = { dikemas: 0, dipickup: 0, dikirim: 0, selesai: 0, komplain: 0 } as Record<ShipmentItem['status'], number>;
    shipments.forEach((s) => { c[s.status] += 1; });
    return c;
  }, [shipments]);

  const chipItems = [
    { label: '7 hari', value: '7d' as RangeKey },
    { label: '30 hari', value: '30d' as RangeKey },
    { label: '12 bulan', value: '12m' as RangeKey },
  ];

  const formatCurrency = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

const onPressEdit = () => router.push('/editProfile');
  const onPressSignOut = () => router.replace('/login');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <LinearGradient
          colors={[colors.primary, '#5a9cf5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerTop}>
            <View style={styles.avatarWrap}>
              <Image source={require('../../assets/images/default-logo.png')} style={styles.avatar} />
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.name}>John Doe</Text>
              <View style={styles.badgeRow}>
                <Feather name="award" size={16} color={colors.onPrimary} />
                <Text style={styles.badgeText}>Gold Member</Text>
                <View style={styles.rankDot} />
                <Text style={styles.rankText}>Peringkat #23</Text>
              </View>
            </View>
            <View style={styles.headerActions}>
              <Pressable onPress={onPressEdit} style={styles.actionBtn} accessibilityRole="button">
                <Feather name="edit" size={18} color={colors.onPrimary} />
              </Pressable>
              <Pressable onPress={onPressSignOut} style={styles.actionBtn} accessibilityRole="button">
                <Feather name="log-out" size={18} color={colors.onPrimary} />
              </Pressable>
            </View>
          </View>

          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>Menuju Platinum</Text>
            <Text style={styles.progressPct}>65%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
        </LinearGradient>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Feather name="shopping-bag" size={18} color={colors.primary} />
              <Text style={styles.sectionTitle}>Riwayat Belanja</Text>
            </View>
            <CustomChipScroll<RangeKey>
              items={chipItems}
              selected={range}
              onSelect={(v) => setRange(v)}
            />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
            <View style={[styles.statCard, styles.cardHorizontal, styles.shadow]}>
              <Text style={styles.statLabel}>Total Belanja</Text>
              <Text style={styles.statValue}>{formatCurrency(totalSpent)}</Text>
            </View>
            <View style={[styles.statCard, styles.cardHorizontal, styles.shadow]}>
              <Text style={styles.statLabel}>Total Barang</Text>
              <Text style={styles.statValue}>{totalItems}</Text>
            </View>
            <View style={[styles.statCard, styles.cardHorizontal, styles.shadow]}>
              <Text style={styles.statLabel}>Dikembalikan</Text>
              <Text style={styles.statValue}>{returnedItems}</Text>
            </View>
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Feather name="gift" size={18} color={colors.primary} />
            <Text style={styles.sectionTitle}>Bonus yang Diklaim</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
            {claimedBonuses.map((b) => (
              <View key={b.key} style={[styles.bonusCard, styles.cardHorizontal, styles.shadow]}>
                <View style={styles.bonusIconWrap}>
                  <Feather name={b.icon} size={16} color={colors.primary} />
                </View>
                <Text style={styles.bonusLabel}>{b.key}</Text>
                <Text style={styles.bonusValue}>{b.count}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Feather name="truck" size={18} color={colors.primary} />
            <Text style={styles.sectionTitle}>Status Pengiriman</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
            {(['dikemas', 'dipickup', 'dikirim', 'selesai', 'komplain'] as const).map((key) => (
              <View key={key} style={[styles.shipCard, styles.cardHorizontal, styles.shadow]}>
                <Text style={styles.shipLabel}>{toTitle(key)}</Text>
                <Text style={styles.shipValue}>{shipmentCounts[key]}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Feather name="shopping-cart" size={18} color={colors.primary} />
            <Text style={styles.sectionTitle}>Ringkasan</Text>
          </View>
          <View style={styles.gridRow}>
            <Pressable style={[styles.gridCard, styles.shadow]} onPress={() => router.push('/cart')} accessibilityRole="button">
              <View style={styles.gridIconWrap}>
                <Feather name="shopping-cart" size={18} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.gridLabel}>Cart</Text>
                <Text style={styles.gridValue}>{cartTotal}</Text>
              </View>
            </Pressable>
            <Pressable style={[styles.gridCard, styles.shadow]} onPress={() => router.push('/favorite')} accessibilityRole="button">
              <View style={styles.gridIconWrap}>
                <Feather name="heart" size={18} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.gridLabel}>Wishlist</Text>
                <Text style={styles.gridValue}>{wishlistTotal}</Text>
              </View>
            </Pressable>
          </View>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function toTitle(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarWrap: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  headerInfo: {
    flex: 1,
    paddingRight: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.onPrimary,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  badgeText: {
    color: colors.onPrimary,
    fontWeight: '600',
  },
  rankDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  rankText: {
    color: colors.onPrimary,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  progressLabel: {
    color: colors.onPrimary,
    fontWeight: '600',
  },
  progressPct: {
    color: colors.onPrimary,
  },
  progressTrack: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 4,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressFill: {
    width: '65%',
    height: '100%',
    backgroundColor: colors.onPrimary,
    borderRadius: 4,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.black,
  },
  hScroll: {
    paddingHorizontal: 4,
    gap: 12,
  },
  statCard: {
    flex: 0,
    backgroundColor: colors.white,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  cardHorizontal: {
    minWidth: 160,
    marginRight: 12,
  },
  statLabel: {
    fontSize: 12,
    color: colors.grayDark,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.black,
  },
  shipCard: {
    flex: 0,
    minWidth: 140,
    backgroundColor: colors.white,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  shipLabel: {
    fontSize: 12,
    color: colors.grayDark,
    marginBottom: 8,
  },
  shipValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.black,
  },
  bonusCard: {
    flex: 0,
    minWidth: 160,
    backgroundColor: colors.white,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  bonusIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(32, 99, 247, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  bonusLabel: {
    fontSize: 12,
    color: colors.grayDark,
    marginBottom: 6,
  },
  bonusValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.black,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 12,
  },
  gridCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.gray,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  gridIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(32, 99, 247, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridLabel: {
    fontSize: 12,
    color: colors.grayDark,
    marginBottom: 6,
  },
  gridValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.black,
  },
});