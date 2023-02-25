import React, { useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '../components/Header/Header';
import { SingleLineInput } from '../components/SingleLineInput';
import { Button } from '../components/Button';
import { Typography } from '../components/Typography';
import { Spacer } from '../components/Spacer';
import { RemoteImage } from '../components/RemoteImage';
import { atomLinkList } from '../states/atomLinkList';
import { getOpenGraphData } from '../utils/OpenGraphTagUtils';

interface Metadata {
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
                    title: '',
                    image: '',
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
        const result = await getOpenGraphData(url);
        setMetadata(result);
    };

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
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingTop: 32,
                    paddingHorizontal: 24,
                }}>
                <SingleLineInput
                    value={url}
                    onChangeText={setUrl}
                    onSubmitEditing={onSubmitEditing}
                    placeholder="https://example.com"
                />
                {metadata !== null && (
                    <>
                        <Spacer space={20} />
                        <View style={{ borderWidth: 1, borderRadius: 4, borderColor: 'gray' }}>
                            <RemoteImage url={metadata.image} width={width - 48} height={(width - 48) / 2} />
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
