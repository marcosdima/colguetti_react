import { TextInput } from "react-native"
import { useTheme } from "../../contexts/theme-context"
import { ComponentProps } from "react";

type ThemedTextInputProps = ComponentProps<typeof TextInput>;

export default ({ style, ...props}: ThemedTextInputProps) => {
  const { theme } = useTheme();
  
  const inputStyle = {
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    borderColor: theme.text,
    color: theme.text,
  }

  return (
    <TextInput style={[inputStyle, style]} { ...props }/>
  )
}