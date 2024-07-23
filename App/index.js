// Filename: index.js
// Combined code from all files

import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('screen');

const COLS = 20;
const CELL_SIZE = width / COLS;
const ROWS = Math.floor(height / CELL_SIZE);

const directions = {
  RIGHT: { x: 1, y: 0 },
  LEFT: { x: -1, y: 0 },
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
};

const getRandomPosition = () => {
  const x = Math.floor(Math.random() * COLS);
  const y = Math.floor(Math.random() * ROWS);
  return { x, y };
};

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 2, y: 2 }]);
  const [direction, setDirection] = useState(directions.RIGHT);
  const [food, setFood] = useState(getRandomPosition());
  const [isPlaying, setIsPlaying] = useState(true);

  const gameLoop = useRef(null);

  const moveSnake = () => {
    setSnake((prevSnake) => {
      const newHead = {
        x: prevSnake[0].x + direction.x,
        y: prevSnake[0].y + direction.y,
      };

      if (
        newHead.x >= COLS ||
        newHead.x < 0 ||
        newHead.y >= ROWS ||
        newHead.y < 0 ||
        prevSnake.some((cell) => cell.x === newHead.x && cell.y === newHead.y)
      ) {
        setIsPlaying(false);
        if (gameLoop.current) clearInterval(gameLoop.current);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      if (newHead.x === food.x && newHead.y === food.y) {
        setFood(getRandomPosition());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  };

  useEffect(() => {
    if (isPlaying) {
      gameLoop.current = setInterval(moveSnake, 200);
    }

    return () => {
      if (gameLoop.current) clearInterval(gameLoop.current);
    };
  }, [isPlaying, direction]);

  const handleDirectionChange = (newDirection) => {
    setDirection(newDirection);
  };

  return (
    <View style={styles.container}>
      {snake.map((segment, index) => (
        <View
          key={index}
          style={[
            styles.snakeSegment,
            {
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
            },
          ]}
        />
      ))}
      <View
        style={[
          styles.food,
          {
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
          },
        ]}
      />
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => handleDirectionChange(directions.UP)} style={styles.controlButton}>
          <Text>Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDirectionChange(directions.LEFT)} style={styles.controlButton}>
          <Text>Left</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDirectionChange(directions.DOWN)} style={styles.controlButton}>
          <Text>Down</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDirectionChange(directions.RIGHT)} style={styles.controlButton}>
          <Text>Right</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  snakeSegment: {
    position: 'absolute',
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: 'green',
  },
  food: {
    position: 'absolute',
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: 'red',
  },
  controls: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  controlButton: {
    padding: 20,
    margin: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
});

export default function App() {
  return (
    <SafeAreaView style={appStyles.container}>
      <Text style={appStyles.title}>Snake Game</Text>
      <SnakeGame />
    </SafeAreaView>
  );
}

const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
});