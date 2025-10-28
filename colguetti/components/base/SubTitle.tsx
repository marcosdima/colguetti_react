import { ComponentProps } from "react";
import { Text } from "react-native";
import { useTheme } from "../../contexts/theme-context";
import { TextProps } from "../../types/default-react";


export default ({ style, ...props }: TextProps) => {
  const { theme } = useTheme();

  return (
    <Text
      style={[
        {
          color: theme.text,
          fontSize: 18,
          opacity: 0.8,
          marginBottom: 6,
        },
        style,
      ]}
      {...props}
    />
  );
};
