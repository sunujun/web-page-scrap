import { OpenGraphParser } from 'react-native-opengraph-kit';

export const getOpenGraphData = async (url: string) => {
    const result = await OpenGraphParser.extractMeta(url);
    console.warn(result);
    return result[0] || null;
};
