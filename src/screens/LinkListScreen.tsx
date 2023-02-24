import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../components/Button';
import { Header } from '../components/Header/Header';
import { Spacer } from '../components/Spacer';
import { Typography } from '../components/Typography';
import { LinkStackScreenProps } from '../navigation/types';

export const LinkListScreen = () => {
    const navigation = useNavigation<LinkStackScreenProps<'LinkList'>['navigation']>();
    const onPressButton = () => {
        navigation.navigate('LinkDetail');
    };
    const onPressAddButton = () => {
        navigation.navigate('AddLink');
    };

    return (
        <View style={{ flex: 1 }}>
            <Header>
                <Header.Group>
                    <Header.Title title="LINK LIST" />
                </Header.Group>
            </Header>
            <View style={{ flex: 1 }}>
                <Button onPress={onPressButton}>
                    <Typography>Link Detail로 이동</Typography>
                </Button>
                <Spacer space={12} />
                <Button onPress={onPressAddButton}>
                    <Typography>링크 등록하기로 이동</Typography>
                </Button>
            </View>
        </View>
    );
};
