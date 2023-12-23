import React from 'react';
import { View, Text, FlatList, StyleSheet,ScrollView } from 'react-native';

const NotiCard = ({ notifications }) => {
  const renderItem = ({ item }) => (
        <View style={styles.card}>
             <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.message}>{item.message}</Text>
        </View>
  );

  return (
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    minWidth: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: '#444',
  },
});

export default NotiCard;
