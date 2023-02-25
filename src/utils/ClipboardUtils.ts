import Clipboard from '@react-native-clipboard/clipboard';

export const getClipboardString = () => {
    return Clipboard.getString();
};
