import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinkStackNavigation } from './LinkStackNavigation';
import { AddLinkScreen } from '../screens/AddLinkScreen';

const Stack = createNativeStackNavigator();

export const RootStackNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName="LinkList"
            screenOptions={{
                presentation: 'containedModal',
                headerShown: false,
            }}>
            <Stack.Screen name="LinkStack" component={LinkStackNavigation} />
            <Stack.Screen name="AddLink" component={AddLinkScreen} />
        </Stack.Navigator>
    );
};
