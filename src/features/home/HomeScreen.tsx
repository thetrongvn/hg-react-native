import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

import {increment, decrement, incrementByAmount} from '@redux/slices/homeSlice';
import {selectCount, useAppDispatch, useAppSelector} from '@redux/store';
import {fonts} from '@styles';
import {useTheme} from '@theme/useTheme';
import i18n from '@i18n';

export default function HomeScreen() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const {theme} = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.titleText, {color: theme.primary}]}>
        {i18n.t('home.title')}
      </Text>
      <Text style={[styles.bodyText, {color: theme.primary}]}>
        {i18n.t('home.counter', {count})}
      </Text>

      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
      <Button
        title="Add Async"
        onPress={() => {
          setTimeout(() => dispatch(incrementByAmount(2)), 1000);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: fonts.primaryRegular,
    fontSize: 32,
    marginVertical: 3,
  },
  bodyText: {
    fontFamily: fonts.primaryRegular,
    fontSize: 18,
    marginVertical: 3,
  },
});
