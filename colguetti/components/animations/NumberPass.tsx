import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import Text from '../base/Text';

type NumberPassProp = {
  numberUp?: number;
  number: number;
}

export default ({ numberUp, number }: NumberPassProp) => {
  const prevAnim = useRef(new Animated.Value(0)).current;
  const curr = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const durationMs = 400;

    prevAnim.setValue(0);
    curr.setValue(0);

    Animated.timing(prevAnim, {
      toValue: 1,
      duration: durationMs,
      useNativeDriver: true,
    }).start();
    Animated.timing(curr, {
      toValue: 1,
      duration: durationMs,
      useNativeDriver: true,
    }).start();
  }, [number]);
  
  return (
    <Animated.View
      style={{
          transform: [
              {
                translateY: prevAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -10],
                }),
              },
            ],
        }}
    >
      <Animated.View
        style={{
          opacity: prevAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          })
        }}
      >
        <Text>{numberUp === undefined ? (number + 1) : numberUp}</Text>
      </Animated.View>
      <Animated.View
        style={{ opacity: curr }}
      >
        <Text>{number}</Text>
      </Animated.View>
    </Animated.View>
    
  )
};