import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class Baris extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Baris (Top • kiri)</Text>
        <View style={styles.barisKiriTop}>
          <View style={styles.boxMerah} />
          <View style={styles.boxKuning} />
          <View style={styles.boxHijau} />
        </View>

        <Text>Baris (Middle • tengah)</Text>
        <View style={styles.barisTengahMiddle}>
          <View style={styles.boxMerah} />
          <View style={styles.boxKuning} />
          <View style={styles.boxHijau} />
        </View>

        <Text>Baris (Bottom • kanan)</Text>
        <View style={styles.barisKananBottom}>
          <View style={styles.boxMerah} />
          <View style={styles.boxKuning} />
          <View style={styles.boxHijau} />
        </View>

        <Text>Baris dengan space-between</Text>
        <View style={styles.barisSpaceBetween}>
          <View style={styles.boxMerah} />
          <View style={styles.boxKuning} />
          <View style={styles.boxHijau} />
        </View>

        <Text>Baris dengan space-around</Text>
        <View style={styles.barisSpaceAround}>
          <View style={styles.boxMerah} />
          <View style={styles.boxKuning} />
          <View style={styles.boxHijau} />
        </View>

        <Text>Baris dengan space-evenly</Text>
        <View style={styles.barisSpaceEvenly}>
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

    barisKiriTop: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 8,
    },
    barisTengahMiddle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    barisKananBottom: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        gap: 8,
    },

    barisSpaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    barisSpaceAround: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    barisSpaceEvenly: {
        flexDirection: 'row',
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
