import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, View, ViewProps } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

type GoUpProps = ViewProps & {
  yMovement?: number;
  duration?: number;
  delay?: number;
};

export default ({
  children,
  yMovement = 20,
  duration = 400,
  delay = 200,
  ...props
}: GoUpProps) => {
  const childArray = React.Children.toArray(children);

  const animatedValues = useMemo(
    () => childArray.map((_, index) =>new Animated.Value(0)),
    [childArray.length]
  );

  // Go up animation function.
  const goUpFunction = useCallback(() => {
    // Animate only new children.
    const animations = animatedValues
      .map((anim) =>
        Animated.timing(anim, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        })
      );

    Animated.stagger(delay, animations).start();
  }, [animatedValues, delay, duration]);

  // Trigger go-up animation on focus change.
  useFocusEffect(
    useCallback(() => {
      animatedValues.forEach((v) => v.setValue(0));
      goUpFunction();
    }, [goUpFunction])
  );

  return (
    <View {...props}>
      {
        childArray.map((child, index) => (
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