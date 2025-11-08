import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import colors from '../app/constants/colors';

export interface CustomProductCardProps {
  image: any; // ImageSourcePropType (use any for require/uri)
  title: string;
  price: number | string;
  ratingValue: number; // e.g., 4.5
  ratingCount: number; // e.g., 120 reviews
  likeCount: number; // e.g., 35 likes
  isLiked?: boolean;
  onPressCard?: () => void;
  onPressCart?: () => void;
  onPressLike?: () => void;
  containerStyle?: ViewStyle;
}

const formatPrice = (price: number | string) => {
  if (typeof price === 'number') {
    try {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
      }).format(price);
    } catch {
      return `Rp${price.toLocaleString('id-ID')}`;
    }
  }
  return price;
};

const CustomProductCard: React.FC<CustomProductCardProps> = ({
  image,
  title,
  price,
  ratingValue,
  ratingCount,
  likeCount,
  isLiked = false,
  onPressCard,
  onPressCart,
  onPressLike,
  containerStyle,
}) => {
  return (
    <Pressable style={[styles.card, containerStyle]} onPress={onPressCard}>
      <Image source={image} style={styles.image} resizeMode="cover" />

      <View style={styles.content}>
        <Text numberOfLines={2} style={styles.title}>{title}</Text>

        <View style={[styles.rowBetween, { marginTop: 4 }]}>
          <View style={styles.rowLeft}>
            <View style={styles.ratingWrap}>
              <Feather name="star" size={16} color={colors.warning} />
              <Text style={styles.ratingText}>{ratingValue.toFixed(1)}</Text>
              <Text style={styles.ratingCount}>({ratingCount})</Text>
            </View>
            <Pressable style={styles.likeWrap} onPress={onPressLike}>
              <Feather name={isLiked ? 'heart' : 'heart'} size={16} color={isLiked ? colors.danger : colors.grayDark} />
              <Text style={styles.likeCount}>{likeCount}</Text>
            </Pressable>
          </View>
        </View>

        <View style={[styles.rowBetween, { marginTop: 8 }]}>
          <Text style={styles.price}>{formatPrice(price)}</Text>
          <Pressable style={styles.cartButton} onPress={onPressCart}>
            <Feather name="shopping-cart" size={18} color={colors.white} />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.transparentBlack10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 140,
  },
  content: {
    padding: 0,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.grayDark,
    marginBottom: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 8,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ratingWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingText: {
    fontSize: 13,
    color: colors.grayDark,
    fontWeight: '600',
  },
  ratingCount: {
    fontSize: 12,
    color: colors.gray,
  },
  likeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  likeCount: {
    fontSize: 12,
    color: colors.grayDark,
    fontWeight: '600',
  },
  cartButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
});

export default CustomProductCard;