import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class Kolom extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Kolom (Top • kiri)</Text>
        <View style={styles.kolomKiriTop}>
          <View style={styles.boxMerah} />
          <View style={styles.boxKuning} />
          <View style={styles.boxHijau} />
        </View>

        <Text>Kolom (Middle • tengah)</Text>
        <View style={styles.kolomTengahMiddle}>
          <View style={styles.boxMerah} />
          <View style={styles.boxKuning} />
          <View style={styles.boxHijau} />
        </View>

        <Text>Kolom (Bottom • kanan)</Text>
        <View style={styles.kolomKananBottom}>
          <View style={styles.boxMerah} />
          <View style={styles.boxKuning} />
          <View style={styles.boxHijau} />
        </View>

        <Text>Kolom dengan space-between</Text>
        <View style={styles.kolomSpaceBetween}>
          <View style={styles.boxMerah} />
          <View style={styles.boxKuning} />
          <View style={styles.boxHijau} />
        </View>

        <Text>Kolom dengan space-around</Text>
        <View style={styles.kolomSpaceAround}>
          <View style={styles.boxMerah} />
          <View style={styles.boxKuning} />
          <View style={styles.boxHijau} />
        </View>

        <Text>Kolom dengan space-evenly</Text>
        <View style={styles.kolomSpaceEvenly}>
          <View style={styles.boxMerah} />
          <View style={styles.boxKuning} />
          <View style={styles.boxHijau} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    gap: 12,
  },
  kolomKiriTop: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 8,
  },
  kolomTengahMiddle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  kolomKananBottom: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    gap: 8,
  },
  kolomSpaceBetween: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  kolomSpaceAround: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  kolomSpaceEvenly: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  boxMerah: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
  boxKuning: {
    width: 100,
    height: 100,
    backgroundColor: 'yellow',
  },
  boxHijau: {
    width: 100,
    height: 100,
    backgroundColor: 'green',
  },
})
