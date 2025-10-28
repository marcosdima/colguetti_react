import { ComponentProps } from "react";
import { useTheme } from "../../contexts/theme-context";
import { Text } from "react-native";
import { TextProps } from '../../types/default-react';

export default ({ style, ...props }: TextProps) => {
  const { theme } = useTheme();
  return (
    <Text
      style={[
        {
          color: theme.text.primary,
        },
        style,
      ]}
      {...props}
    />
  )
}