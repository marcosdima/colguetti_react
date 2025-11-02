import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, View, ViewProps } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

type PopProps = ViewProps & {
  duration?: number;
  delay?: number;
  tension?: number;
  friction?: number;
  maxScale?: number;
};

export default ({
  children,
  duration = 400,
  delay = 100,
  tension = 50,
  friction = 4,
  maxScale = 1.2,
  ...props
}: PopProps) => {
  const childArray = React.Children.toArray(children);

  // Register previous children count to animate only new children.
  const prevChildrenCount = useRef(0);
  
  // Create animated values for each child.
  const animatedValues = useMemo(() => 
    childArray.map(() => new Animated.Value(0)),
    [childArray.length]
  );

  // Pop animation function.
  const popFunction = useCallback(() => {
    // Animate only new children.
    const animations = animatedValues
      .slice(prevChildrenCount.current)
      .map((anim) =>
      Animated.spring(anim, {
        toValue: 1,
        tension,
        friction,
        useNativeDriver: true,
      })
    );

    // Update previous children count.
    prevChildrenCount.current = childArray.length;

    // Start staggered animations.
    Animated.stagger(delay, animations).start();
  }, [animatedValues, delay, tension, friction]);

  // Trigger pop animation on children change.
  useEffect(() => {
    animatedValues.forEach((v, i) => v.setValue(i >= prevChildrenCount.current ? 0 : 1));
    popFunction();
  }, [childArray.length, popFunction]);

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
                  scale: animatedValues[index].interpolate({
                    inputRange: [0, 0.6, 1],
                    outputRange: [0, maxScale, 1],
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
