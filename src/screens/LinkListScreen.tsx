import React, { useMemo } from 'react';
import { View, SectionList } from 'react-native';
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

    type dateListType = {
        [dateId: string]: LinkItem[];
    };

    const sectionData = useMemo(() => {
        const dateList: dateListType = {};

        const makeDateString = (createdAt: string) => {
            const dateItem = new Date(createdAt);

            return `${dateItem.getFullYear()}.${
                dateItem.getMonth() + 1
            }.${dateItem.getDate()} ${dateItem.getHours()}:${dateItem.getMinutes()}`;
        };

        if (!data.list) {
            return [];
        }

        data.list.forEach(item => {
            const keyName = makeDateString(item.createdAt);
            if (!dateList[keyName]) {
                dateList[keyName] = [item];
            } else {
                dateList[keyName].push(item);
            }
        });

        return Object.keys(dateList).map(item => {
            return {
                title: item,
                data: dateList[item],
            };
        });
    }, [data.list]);

    return (
        <View style={{ flex: 1 }}>
            <Header>
                <Header.Group>
                    <Header.Title title="LINK LIST" />
                </Header.Group>
            </Header>
            <SectionList
                style={{ flex: 1 }}
                sections={sectionData}
                renderItem={({ item }) => {
                    return (
                        <Button onPress={() => onPressListItem(item)} paddingHorizontal={24} paddingVertical={24}>
                            <View>
                                <Typography fontSize={20}>{item.link}</Typography>

                                <Spacer space={4} />

                                <Typography fontSize={16} color="gray">
                                    {item.title !== '' ? `${item.title.slice(0, 20)} | ` : ''}
                                    {new Date(item.createdAt).toLocaleString()}
                                </Typography>
                            </View>
                        </Button>
                    );
                }}
                renderSectionHeader={({ section }) => {
                    return (
                        <View style={{ paddingHorizontal: 12, paddingVertical: 4, backgroundColor: 'white' }}>
                            <Typography color="gray" fontSize={12}>
                                {section.title}
                            </Typography>
                        </View>
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
