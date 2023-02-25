import React from 'react';
import { View, FlatList } from 'react-native';
import { useRecoilValue } from 'recoil';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { Header } from '../components/Header/Header';
import { Icon } from '../components/Icon';
import { Typography } from '../components/Typography';
import { Spacer } from '../components/Spacer';
import { LinkStackScreenProps } from '../navigation/types';
import { atomLinkList, LinkItem } from '../states/atomLinkList';

export const LinkListScreen = () => {
    const navigation = useNavigation<LinkStackScreenProps<'LinkList'>['navigation']>();
    const safeAreaInset = useSafeAreaInsets();
    const data = useRecoilValue(atomLinkList);
    const onPressListItem = (item: LinkItem) => {
        navigation.navigate('LinkDetail', { item: item });
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
            <FlatList
                style={{ flex: 1 }}
                data={data.list}
                renderItem={({ item }) => {
                    return (
                        <Button
                            onPress={() => {
                                onPressListItem(item);
                            }}
                            paddingHorizontal={24}
                            paddingVertical={24}>
                            <View>
                                <Typography fontSize={20}>{item.link}</Typography>
                                <Spacer space={4} />
                                <Typography fontSize={16} color="gray">
                                    {item.title !== '' ? item.title.slice(0, 20) + ' | ' : ''}
                                    {new Date(item.createdAt).toLocaleString()}
                                </Typography>
                            </View>
                        </Button>
                    );
                }}
            />
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
