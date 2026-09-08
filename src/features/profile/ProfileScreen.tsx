import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {authService} from '@core/services';
import {selectProfile, useAppSelector} from '@redux/store';
import {useTheme} from '@theme/useTheme';
import i18n from '@i18n';

const profilePic = require('@assets/images/profile-pic.png');

type OptionProps = {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
};

const Option = ({icon, label, onPress}: OptionProps) => (
  <TouchableOpacity style={styles.option} onPress={onPress}>
    <View style={styles.optionContent}>
      {icon}
      <Text style={styles.optionText}>{label}</Text>
    </View>
    <Icon name="chevron-right" size={20} color="#999" />
  </TouchableOpacity>
);

export default function ProfileScreen() {
  const user = useAppSelector(selectProfile);
  const {theme} = useTheme();

  const handleSignOut = () => {
    authService.signOut();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View />

      <Image source={user.avatar || profilePic} style={styles.profilePic} />

      <Text style={styles.name}>{user.displayName}</Text>
      <Text style={styles.username}>@{user.username}</Text>
      <Text style={styles.bio}>{user.bio}</Text>

      <Option
        icon={<Ionicons name="lock-closed-outline" size={20} />}
        label={i18n.t('profile.privacy')}
      />
      <Option
        icon={<Ionicons name="time-outline" size={20} />}
        label={i18n.t('profile.purchaseHistory')}
      />
      <Option
        icon={<MaterialIcons name="help-outline" size={20} />}
        label={i18n.t('profile.help')}
      />
      <Option
        icon={<Ionicons name="settings-outline" size={20} />}
        label={i18n.t('profile.settings')}
      />
      <Option
        icon={<Ionicons name="log-out-outline" size={20} color={theme.error} />}
        label={i18n.t('profile.signOut')}
        onPress={handleSignOut}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
    marginTop: 84,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  username: {
    color: '#888',
    marginBottom: 5,
  },
  bio: {
    textAlign: 'center',
    paddingHorizontal: 20,
    color: '#444',
    marginBottom: 20,
  },
  option: {
    backgroundColor: '#eee',
    padding: 15,
    borderRadius: 15,
    width: '100%',
    marginVertical: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
  },
});
