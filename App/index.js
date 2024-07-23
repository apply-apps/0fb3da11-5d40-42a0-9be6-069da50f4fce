// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import axios from 'axios';

const API_URL = 'http://apihub.p.appply.xyz:3300/chatgpt';

const FairyTaleGenerator = () => {
  const [heroes, setHeroes] = useState('');
  const [villains, setVillains] = useState('');
  const [plot, setPlot] = useState('');
  const [loading, setLoading] = useState(false);
  const [fairyTale, setFairyTale] = useState('');

  const generateFairyTale = async () => {
    setLoading(true);
    try {
      const response = await axios.post(API_URL, {
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful assistant. Please create a fairy tale based on the given heroes, villains, and plot.'
          },
          { role: 'user', content: `Heroes: ${heroes}, Villains: ${villains}, Plot: ${plot}` }
        ],
        model: 'gpt-4o'
      });
      const { data } = response;
      setFairyTale(data.response);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.generatorContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter heroes (comma separated)"
        value={heroes}
        onChangeText={setHeroes}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter villains (comma separated)"
        value={villains}
        onChangeText={setVillains}
      />
      <TextInput style={styles.input} placeholder="Enter plot" value={plot} onChangeText={setPlot} />
      <Button title="Generate Fairy Tale" onPress={generateFairyTale} disabled={loading} />

      {loading ? <ActivityIndicator size="large" color="#0000ff" style={styles.loading} /> : <Text style={styles.fairyTale}>{fairyTale}</Text>}
    </ScrollView>
  );
};

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Fairy Tale Generator</Text>
      <FairyTaleGenerator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10
  },
  generatorContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15
  },
  loading: { marginTop: 20 },
  fairyTale: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center'
  }
});