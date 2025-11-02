import React, { useRef, useCallback } from 'react';
import { Animated, View, ViewProps } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

type GoUpProps = ViewProps & {
  yMovement?: number;
  duration?: number;
  delay?: number;
};

export default (
  {
    children,
    yMovement = 20,
    duration = 400,
    delay = 200,
    ...props
  }: GoUpProps
) => {
  const animatedValues = React.Children.map(children, () => useRef(new Animated.Value(0)).current);
  if (!animatedValues) return;

  const goUpFunction = () => {
    const animations = animatedValues.map((anim) =>
      Animated.timing(anim, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      })
    );

    Animated.stagger(delay, animations).start();
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
                  outputRange: [yMovement, 0],
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
