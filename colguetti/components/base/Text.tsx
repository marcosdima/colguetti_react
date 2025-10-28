import { ComponentProps } from "react";
import { useTheme } from "../../contexts/theme-context";
import { Text } from "react-native";

type ThemedTextProps = ComponentProps<typeof Text>;

export default ({ style, ...props }: ThemedTextProps) => {
  const { theme } = useTheme();
    
  const textStyle = {
    color: theme.text,
  }

  return (
    <Text style={[textStyle, style]} {...props}/>
  )
}