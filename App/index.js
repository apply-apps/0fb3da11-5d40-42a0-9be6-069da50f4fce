// Filename: index.js
// Combined code from all files

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Alert } from 'react-native';

const CELL_SIZE = 20;
const BOARD_SIZE = 15 * CELL_SIZE;

const Game = () => {
  const [snake, setSnake] = useState([{ x: 5, y: 5 }]);
  const [food, setFood] = useState({ x: 10, y: 10 });
  const [direction, setDirection] = useState('RIGHT');
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    let id = setInterval(moveSnake, 200);
    setIntervalId(id);
    return () => clearInterval(id);
  }, [snake, direction]);

  const moveSnake = () => {
    let newSnake = [...snake];
    let head = { ...newSnake[newSnake.length - 1] };

    switch (direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
    }

    newSnake.push(head);
    if (head.x === food.x && head.y === food.y) {
      let newFood = {
        x: Math.floor(Math.random() * (BOARD_SIZE / CELL_SIZE)),
        y: Math.floor(Math.random() * (BOARD_SIZE / CELL_SIZE)),
      };
      setFood(newFood);
    } else {
      newSnake.shift();
    }

    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= BOARD_SIZE / CELL_SIZE ||
      head.y >= BOARD_SIZE / CELL_SIZE ||
      newSnake.slice(0, -1).some((s) => s.x === head.x && s.y === head.y)
    ) {
      clearInterval(intervalId);
      Alert.alert('Game Over');
      setSnake([{ x: 5, y: 5 }]);
      setDirection('RIGHT');
      setIntervalId(setInterval(moveSnake, 200));
    } else {
      setSnake(newSnake);
    }
  };

  const renderSnake = () => {
    return snake.map((cell, index) => (
      <View key={index} style={[styles.snakeCell, { left: cell.x * CELL_SIZE, top: cell.y * CELL_SIZE }]} />
    ));
  };

  const renderFood = () => {
    return <View style={[styles.food, { left: food.x * CELL_SIZE, top: food.y * CELL_SIZE }]} />;
  };

  return (
    <View style={styles.board}>
      {renderSnake()}
      {renderFood()}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    backgroundColor: '#EEEEEE',
    position: 'relative',
  },
  snakeCell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: 'green',
    position: 'absolute',
  },
  food: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: 'red',
    position: 'absolute',
  },
});

const App = () => {
  return (
    <SafeAreaView style={stylesApp.container}>
      <StatusBar hidden={true} />
      <Game />
    </SafeAreaView>
  );
};

const stylesApp = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});

export default App;