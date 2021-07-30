/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Header = () => {
    return (
        <View style={styles.header}>
            <Text>Sompod</Text>
        </View>
    )
}

// eslint-disable-next-line no-unused-vars
const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default Header
