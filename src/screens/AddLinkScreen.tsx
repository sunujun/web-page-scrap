import React, { useEffect, useState } from 'react';
import { ActivityIndicator, useWindowDimensions, View } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '../components/Header/Header';
import { SingleLineInput } from '../components/SingleLineInput';
import { Button } from '../components/Button';
import { Typography } from '../components/Typography';
import { Spacer } from '../components/Spacer';
import { RemoteImage } from '../components/RemoteImage';
import { Icon } from '../components/Icon';
import { atomLinkList } from '../states/atomLinkList';
import { getOpenGraphData } from '../utils/OpenGraphTagUtils';
import { getClipboardString } from '../utils/ClipboardUtils';

export interface Metadata {
    image: string;
    title: string;
    description: string;
}

export const AddLinkScreen = () => {
    const navigation = useNavigation();
    const safeAreaInset = useSafeAreaInsets();
    const updateList = useSetRecoilState(atomLinkList);
    const { width } = useWindowDimensions();
    const [url, setUrl] = useState('');
    const [metadata, setMetadata] = useState<Metadata | null>(null);
    const [loading, setLoading] = useState(false);
    const onPressClose = () => {
        navigation.goBack();
    };
    const onPressSave = () => {
        if (url === '') {
            return;
        }
        updateList(prevState => {
            const list = [
                {
                    title: metadata?.title ?? '',
                    image: metadata?.image ?? '',
                    link: url,
                    createdAt: new Date().toISOString(),
                },
            ];

            return {
                list: list.concat(prevState.list),
            };
        });
        setUrl('');
    };
    const onSubmitEditing = async () => {
        setLoading(true);
        const result = await getOpenGraphData(url);
        setMetadata(result);
        setLoading(false);
    };
    const onGetClipboardString = async () => {
        const result = await getClipboardString();
        if (result.startsWith('http://') || result.startsWith('https://')) {
            setUrl(result);
            const ogResult = await getOpenGraphData(result);
            setMetadata({
                title: ogResult.title,
                image: ogResult.image,
                description: ogResult.description,
            });
        }
    };

    useEffect(() => {
        onGetClipboardString();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <Header>
                <Header.Group>
                    <Header.Title title="ADD LINK" />
                </Header.Group>
                <Header.Button iconName="close" onPress={onPressClose} />
            </Header>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    paddingTop: 32,
                    paddingHorizontal: 24,
                }}>
                <View>
                    <SingleLineInput
                        value={url}
                        onChangeText={setUrl}
                        placeholder="https://example.com"
                        onSubmitEditing={onSubmitEditing}
                    />
                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            right: 0,
                            borderWidth: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Button
                            onPress={() => {
                                setUrl('');
                                setMetadata(null);
                            }}>
                            <Icon name="close" color="black" size={20} />
                        </Button>
                    </View>
                </View>
                {loading ? (
                    <>
                        <Spacer space={20} />
                        <View style={{ borderWidth: 1, borderRadius: 4, borderColor: 'gray' }}>
                            <Spacer space={(width - 48) * 0.5} />
                            <Spacer space={50} />
                            <View
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <ActivityIndicator />
                            </View>
                        </View>
                    </>
                ) : (
                    metadata !== null && (
                        <>
                            <Spacer space={20} />
                            <View style={{ borderWidth: 1, borderRadius: 4, borderColor: 'gray' }}>
                                <RemoteImage
                                    url={metadata.image}
                                    width={width - 52}
                                    height={(width - 52) / 2}
                                    style={{
                                        marginTop: 4,
                                    }}
                                />
                                <View style={{ paddingHorizontal: 12, paddingVertical: 8 }}>
                                    <Spacer space={10} />
                                    <Typography fontSize={20} color="black">
                                        {metadata.title}
                                    </Typography>
                                    <Spacer space={4} />
                                    <Typography fontSize={16} color="gray">
                                        {metadata.description}
                                    </Typography>
                                </View>
                            </View>
                        </>
                    )
                )}
            </View>
            <Button onPress={onPressSave}>
                <View style={{ backgroundColor: url === '' ? 'gray' : 'black' }}>
                    <View style={{ height: 52, alignItems: 'center', justifyContent: 'center' }}>
                        <Typography color="white" fontSize={18}>
                            저장하기
                        </Typography>
                    </View>
                    <Spacer space={safeAreaInset.bottom} />
                </View>
            </Button>
        </View>
    );
};
