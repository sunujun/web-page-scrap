import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from '../components/Header/Header';

export const AddLinkScreen = () => {
    const navigation = useNavigation();
    const onPressClose = () => {
        navigation.goBack();
    };

    return (
        <View style={{ flex: 1 }}>
            <Header>
                <Header.Group>
                    <Header.Title title="ADD LINK" />
                </Header.Group>
                <Header.Button iconName="close" onPress={onPressClose} />
            </Header>
        </View>
    );
};
