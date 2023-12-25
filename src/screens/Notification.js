import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import GlobalStyles from '../untils/GlobalStyles';
import NotiCard from '../components/NotiCard';

const Notification = () => {
  const [notiCount, setNotiCount] = useState(0);
  const navigation = useNavigation();
  const notifications = useSelector((state) => state.notifications.notifications);

  useEffect(() => {
    setNotiCount(notifications.length);
  }, [notifications]);

  useEffect(() => {
    const updateBadge = () => {
      if (navigation && navigation.setParams) {
        navigation.setParams({ notiCount });
      }
    };

    const unsubscribe = navigation.addListener('focus', updateBadge);

    return unsubscribe;
  }, [navigation, notiCount]);

  return (
    <View style={GlobalStyles.container}>
      <NotiCard notifications={notifications} />
    </View>
  );
};

export default Notification;