import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinkItem } from '../states/atomLinkList';

type RootStackParamList = {
    LinkStack: NavigatorScreenParams<LinkStackParamList>;
    AddLink: undefined;
};

type LinkStackParamList = {
    LinkList: undefined;
    LinkDetail: { item: LinkItem };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

export type LinkStackScreenProps<T extends keyof LinkStackParamList> = CompositeScreenProps<
    NativeStackScreenProps<LinkStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
>;

// TODO: 이 코드의 역할은 무엇일까요
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
