import React, { useRef, useCallback } from 'react';
import { Animated, View, ViewProps } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default ({ children, ...props }: ViewProps) => {
  const animatedValues = React.Children.map(children, () => useRef(new Animated.Value(0)).current);
  if (!animatedValues) return;

  const goUpFunction = () => {
    const animations = animatedValues.map((anim) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      })
    );

    Animated.stagger(200, animations).start();
  }
  
  useFocusEffect(
    useCallback(() => {
      animatedValues.forEach(v => v.setValue(0));
      goUpFunction();
    }, [])
  );
  
  return (
    <View
      {...props}
    >
      {
        React.Children.map(children, (child, index) => (
          <Animated.View
            key={index}
            style={{
              opacity: animatedValues[index],
              transform: [
              {
                translateY: animatedValues[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }),
              },
            ],
            }}
          >
            {child}
          </Animated.View>
        ))
      }
    </View>
  );
};
