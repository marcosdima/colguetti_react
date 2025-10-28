import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from '../base/Text';
import { useTheme } from '../../contexts/theme-context';
import { Xmark } from 'iconoir-react-native'; // Si no lo tenés, se puede reemplazar por un emoji o texto

type ChipsProps = {
  items: string[];
  onRemove: (item: string) => void;
};

export default ({ items, onRemove }: ChipsProps) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <View
          key={item}
          style={[
            styles.chip,
            {
              backgroundColor: theme.background,
              borderColor: theme.text.primary,
            },
          ]}
        >
          <Text style={[styles.text, { color: theme.text.primary }]}>{item}</Text>
          <TouchableOpacity onPress={() => onRemove(item)}>
            <Xmark color={theme.text.primary} width={16} height={16} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingTop: 10,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
    gap: 6,
  },
  text: {
    fontSize: 14,
  },
});
