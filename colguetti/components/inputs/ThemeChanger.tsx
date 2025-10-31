import { useRef } from 'react';
import { Pressable, Animated, StyleSheet } from 'react-native';
import { Moon, Sun } from 'lucide-react-native';
import { useTheme } from '../../contexts/theme-context';

export default () => {
  const { themeName, toggleTheme } = useTheme();
  const anim = useRef(new Animated.Value(themeName === 'dark' ? 1 : 0)).current;

  const toggle = () => {
    Animated.timing(anim, {
      toValue: themeName === 'dark' ? 0 : 1,
      duration: 400,
      useNativeDriver: false,
    }).start();
    toggleTheme();
  };

  const bgColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#eee', '#222'],
  });

  const borderColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#222', '#eee'],
  });

  const circlePos = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [4, 34],
  });

  return (
    <Pressable onPress={toggle}>
      <Animated.View style={[styles.switch, { backgroundColor: bgColor, borderColor: borderColor }]}>
        <Animated.View style={[styles.circle, { left: circlePos }]}>
          {themeName === 'dark' ? (
            <Moon size={20} color="#fff" />
          ) : (
            <Sun size={20} width={20} color="#000" />
          )}
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  switch: {
    width: 60,
    height: 32,
    borderRadius: 16,
    padding: 4,
    justifyContent: 'center',
    borderWidth: 1
  },
  circle: {
    position: 'absolute',
    top: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
