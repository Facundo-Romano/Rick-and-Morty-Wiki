import React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Chapters() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{paddingTop: insets.top,
      paddingBottom: insets.bottom}}>
        <Text>Chapters</Text>
    </View>
  )
};