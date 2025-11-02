import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import NumberPass from './NumberPass';
import Text from '../base/Text';

type ClockProps = {
  initialSeconds: number;
};

const pad = (num: number) => num.toString().padStart(2, '0');

export default ({ initialSeconds }: ClockProps) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const { current: endTimeRef } = useRef(Date.now() + initialSeconds * 1000);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, Math.round((endTimeRef - now) / 1000));
      setSecondsLeft(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const [m1, m2] = pad(minutes).split('').map(Number);
  const [s1, s2] = pad(seconds).split('').map(Number);
  
  return (
    <View style={styles.row}>
      <NumberPass number={m1} numberUp={m1 % 10} />
      <NumberPass number={m2} numberUp={m2 % 10} />
      <Text>:</Text>
      <NumberPass number={s1} numberUp={s1 % 10} />
      <NumberPass number={s2} numberUp={s2 === 9 ? 0 : (s2 + 1)} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
});
