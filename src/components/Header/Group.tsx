import React from 'react';
import { View } from 'react-native';

export const Group = ({ children }: { children?: React.ReactNode }) => {
    return <View style={{ flexDirection: 'row', alignItems: 'center' }}>{children}</View>;
};
