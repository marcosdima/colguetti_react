import { Text } from "react-native";
import { useTheme } from "../../contexts/theme-context";
import { TextProps } from '../../types/default-react';

export default ({ style, ...props }: TextProps) => {
  const { theme } = useTheme();

  return (
    <Text
      style={[
        {
          color: theme.text.primary,
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 8
        },
        style,
      ]}
      {...props}
    />
  );
};
