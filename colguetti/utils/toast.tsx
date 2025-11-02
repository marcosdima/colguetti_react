import { Toast } from "toastify-react-native";
import { X, CheckCircle, AlertTriangle, Check } from "lucide-react-native";

const iconSize = 24;

export const success = (
  text1: string,
  text2: string,
  duration: number = 5000,
  iconConfig: {
    color: string;
    size: number;
  } = { color: 'green', size: iconSize }
) => {
  Toast.show({
    type: 'success',
    text1,
    text2,
    autoHide: true,
    visibilityTime: duration,
    closeIcon: <X {...iconConfig} />,
    icon: <Check {...iconConfig} />,
  })
};

export const error = (
  text1: string,
  text2: string,
  duration: number = 5000,
  iconConfig: {
    color: string;
    size: number;
  } = { color: 'red', size: iconSize }
) => (
  Toast.show({
    type: 'error',
    text1,
    text2,
    autoHide: true,
    visibilityTime: duration,
    closeIcon: (<X {...iconConfig} />),
    icon: <X {...iconConfig} />,
  })
);

export const info = (
  text1: string,
  text2: string,
  duration: number = 5000,
  iconConfig: {
    color: string;
    size: number;
  } = { color: 'yellow', size: iconSize }
) => (
  Toast.show({
    type: 'info',
    text1,
    text2,
    autoHide: true,
    visibilityTime: duration,
    closeIcon: (<X {...iconConfig} />),
    icon: <AlertTriangle {...iconConfig} />,
  })
);