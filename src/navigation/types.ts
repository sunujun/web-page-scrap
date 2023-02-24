import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
    LinkStack: NavigatorScreenParams<LinkStackParamList>;
    AddLink: undefined;
};

type LinkStackParamList = {
    LinkList: undefined;
    LinkDetail: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;

export type LinkStackScreenProps<T extends keyof LinkStackParamList> = CompositeScreenProps<
    NativeStackScreenProps<RootStackParamList, 'LinkStack'>,
    NativeStackScreenProps<LinkStackParamList, T>
>;

// TODO: 이 코드의 역할은 무엇일까요
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
