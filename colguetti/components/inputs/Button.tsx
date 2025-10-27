import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type ButtonProps = {
  onPress: () => void;
  disabled?: boolean;
  text: string,
};

const Button = (
  {
    onPress,
    disabled,
    text,
  }: ButtonProps
) => (
  <TouchableOpacity
    style={[styles.button, disabled && styles.disabled]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default Button;
