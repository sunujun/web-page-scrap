import React, { useState } from 'react';
import { View } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '../components/Header/Header';
import { SingleLineInput } from '../components/SingleLineInput';
import { Button } from '../components/Button';
import { Typography } from '../components/Typography';
import { Spacer } from '../components/Spacer';
import { atomLinkList } from '../states/atomLinkList';

export const AddLinkScreen = () => {
    const navigation = useNavigation();
    const safeAreaInset = useSafeAreaInsets();
    const updateList = useSetRecoilState(atomLinkList);
    const [url, setUrl] = useState('');
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

    return (
        <View style={{ flex: 1 }}>
            <Header>
                <Header.Group>
                    <Header.Title title="ADD LINK" />
                </Header.Group>
                <Header.Button iconName="close" onPress={onPressClose} />
            </Header>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 }}>
                <SingleLineInput value={url} onChangeText={setUrl} placeholder="https://example.com" />
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
