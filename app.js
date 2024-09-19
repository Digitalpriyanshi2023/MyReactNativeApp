import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function App() {
  const handlePress = () => {
    alert('Button Pressed!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to My React Native App</Text>
      <Button title="Press Me" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});
