import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { Header } from '../components/Header/Header';
import { Spacer } from '../components/Spacer';
import { Typography } from '../components/Typography';
import { Icon } from '../components/Icon';
import { LinkStackScreenProps } from '../navigation/types';

export const LinkListScreen = () => {
    const navigation = useNavigation<LinkStackScreenProps<'LinkList'>['navigation']>();
    const safeAreaInset = useSafeAreaInsets();
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
            <View style={{ position: 'absolute', right: 24, bottom: 24 + safeAreaInset.bottom }}>
                <Button onPress={onPressAddButton}>
                    <View
                        style={{
                            width: 52,
                            height: 52,
                            borderRadius: 26,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'black',
                        }}>
                        <Icon name="add" color="white" size={12} />
                    </View>
                </Button>
            </View>
        </View>
    );
};
