import React from 'react'
import { View, ActivityIndicator } from 'react-native'

export default () => (
    <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }}>
        <ActivityIndicator size="large" color={"ff5dc8"} />
    </View>
)