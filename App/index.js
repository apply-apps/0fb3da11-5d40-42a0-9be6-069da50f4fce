// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, Button, View } from 'react-native';

const ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const LearnToRead = () => {
    const [index, setIndex] = useState(0);

    const nextLetter = () => {
        setIndex((prevIndex) => (prevIndex + 1) % ALPHABETS.length);
    };

    return (
        <View style={learnToReadStyles.container}>
            <Text style={learnToReadStyles.letter}>{ALPHABETS[index]}</Text>
            <Button title="Next Letter" onPress={nextLetter} />
        </View>
    );
};

const learnToReadStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    letter: {
        fontSize: 150,
        marginBottom: 20,
    },
});

export default function App() {
    return (
        <SafeAreaView style={appStyles.container}>
            <LearnToRead />
        </SafeAreaView>
    );
}

const appStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 20
    },
});