import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import {colors} from '@theme/theme';

type Props = {
  title: string;
  showBack?: boolean;
};

const HeaderBar = ({title, showBack = true}: Props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {showBack ? (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backButton}>
          <Icon name="chevron-back-outline" size={28} color="#555" />
        </TouchableOpacity>
      ) : (
        <View style={styles.backButton} />
      )}

      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <View style={styles.backButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bluish,
    paddingTop: 64,
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  backButton: {
    width: 28,
    marginVertical: 0,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 0,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '300',
    color: '#555',
    textAlign: 'center',
  },
});

export default HeaderBar;
