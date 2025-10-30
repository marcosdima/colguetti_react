import { TextInput } from "react-native"
import { useTheme } from "../../contexts/theme-context"
import { TextInputProps } from "../../types/default-react";

export default ({ style, ...props }: TextInputProps) => {
  const { theme } = useTheme();
  
  const inputStyle = {
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    borderColor: theme.text.primary,
    color: theme.text.primary,
  }
  
  return (
    <TextInput style={[inputStyle, style]} placeholderTextColor={theme.text.secondary} { ...props }/>
  )
}