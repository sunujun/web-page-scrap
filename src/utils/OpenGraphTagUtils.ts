import { OpenGraphParser } from 'react-native-opengraph-kit';
import { Metadata } from '../screens/AddLinkScreen';

export const getOpenGraphData = async (url: string): Promise<Metadata> => {
    const result = await OpenGraphParser.extractMeta(url);

    return result[0] || null;
};
