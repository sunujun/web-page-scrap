import React from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import WebView from 'react-native-webview';
import { Header } from '../components/Header/Header';
import { Spacer } from '../components/Spacer';
import { LinkStackScreenProps } from '../navigation/types';

export const LinkDetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<LinkStackScreenProps<'LinkDetail'>['route']>();
    const onPressBack = () => {
        navigation.goBack();
    };

    return (
        <View style={{ flex: 1 }}>
            <Header>
                <Header.Group>
                    <Header.Button iconName="arrow-back" onPress={onPressBack} />
                    <Spacer space={12} horizontal />
                    <Header.Title title="LINK DETAIL" />
                </Header.Group>
            </Header>
            <WebView style={{ flex: 1 }} source={{ uri: route.params.item.link }} />
        </View>
    );
};
