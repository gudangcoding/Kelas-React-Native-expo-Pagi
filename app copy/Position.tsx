import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import colors from './constants/colors'

const CIRCLE_SIZE = 120

export default function Position() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Demo Position (top • center • bottom)</Text>

      {/* Top center */}
      <View style={styles.topWrapper}>
        <View style={styles.circle}>
          <Feather name="check" size={48} color={colors.white} />
        </View>
        <Text style={styles.label}>Top</Text>
      </View>

      {/* Center middle */}
      <View style={styles.centerWrapper}>
        <View style={styles.circle}>
          <Feather name="check" size={48} color={colors.white} />
        </View>
        <Text style={styles.label}>Center</Text>
      </View>

      {/* Bottom center */}
      <View style={styles.bottomWrapper}>
        <View style={styles.circle}>
          <Feather name="check" size={48} color={colors.white} />
        </View>
        <Text style={styles.label}>Bottom</Text>
      </View>

      {/* Additional variations */}
      <Text style={[styles.title, { marginTop: 24 }]}>Variasi: top-left • center-right • bottom-left</Text>

      {/* Top-left */}
      <View style={styles.topLeftWrapper}>
        <View style={styles.circle}>
          <Feather name="check" size={48} color={colors.white} />
        </View>
        <Text style={styles.label}>Top-left</Text>
      </View>

      {/* Center-right */}
      <View style={styles.centerRightWrapper}>
        <View style={styles.circle}>
          <Feather name="check" size={48} color={colors.white} />
        </View>
        <Text style={styles.label}>Center-right</Text>
      </View>

      {/* Bottom-left */}
      <View style={styles.bottomLeftWrapper}>
        <View style={styles.circle}>
          <Feather name="check" size={48} color={colors.white} />
        </View>
        <Text style={styles.label}>Bottom-left</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    position: 'relative',
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 12,
    color: colors.grayDark,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  label: {
    marginTop: 8,
    color: colors.gray,
  },
  topWrapper: {
    position: 'absolute',
    top: 32,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  centerWrapper: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    alignItems: 'center',
    transform: [{ translateY: -(CIRCLE_SIZE / 2) }],
  },
  bottomWrapper: {
    position: 'absolute',
    bottom: 32,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  topLeftWrapper: {
    position: 'absolute',
    top: 32,
    left: 32,
    alignItems: 'center',
  },
  centerRightWrapper: {
    position: 'absolute',
    top: '50%',
    right: 32,
    alignItems: 'center',
    transform: [{ translateY: -(CIRCLE_SIZE / 2) }],
  },
  bottomLeftWrapper: {
    position: 'absolute',
    bottom: 32,
    left: 32,
    alignItems: 'center',
  },
})