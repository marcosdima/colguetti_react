import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, View, ViewProps } from 'react-native';

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

  // Register previous children count to animate only new children.
  const prevChildrenCount = useRef(0);

  const animatedValues = useMemo(
    () =>
      childArray.map((_, index) =>
        // Only new items start at 0
        new Animated.Value(index >= prevChildrenCount.current ? 0 : 1)
      ),
    [childArray.length]
  );

  // Go up animation function.
  const goUpFunction = useCallback(() => {
    // Animate only new children.
    const animations = animatedValues
      .slice(prevChildrenCount.current)
      .map((anim) =>
        Animated.timing(anim, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        })
      );

    // Update previous children count.
    prevChildrenCount.current = childArray.length;

    // Start staggered animations if there are more than 1.
    if (animations.length > 1) {
      Animated.stagger(delay, animations).start();
    } else {
      animations.forEach((anim) => anim.start());
    }
  }, [animatedValues, delay, duration, childArray.length]);

  // Trigger go-up animation on children change.
  useEffect(() => {
    // ensure existing items stay visible and new ones start hidden
    animatedValues.forEach((v, i) => v.setValue(i >= prevChildrenCount.current ? 0 : 1));
    goUpFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childArray.length, goUpFunction]);

  return (
    <View {...props}>
      {childArray.map((child, index) => (
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
      ))}
    </View>
  );
};