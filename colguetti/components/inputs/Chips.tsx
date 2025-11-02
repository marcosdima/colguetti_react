import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from '../base/Text';
import { useTheme } from '../../contexts/theme-context';
import { X } from 'lucide-react-native';
import Pop from '../animations/Pop';

type ChipsProps = {
  items: string[];
  onRemove: (item: string) => void;
};

export default ({ items, onRemove }: ChipsProps) => {
  const { theme } = useTheme();

  return (
    <Pop style={styles.container}>
      {
        items.map((item) => (
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
              <X color={theme.text.primary} size={16} />
            </TouchableOpacity>
          </View>
        ))
      }
    </Pop>
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
