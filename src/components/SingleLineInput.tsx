import React, { useState } from 'react';
import { View, TextInput, StyleProp, TextStyle } from 'react-native';

export const SingleLineInput = ({
    value,
    onChangeText,
    placeholder,
    style,
    fontSize,
}: {
    value?: string;
    onChangeText?: (text: string) => void;
    placeholder?: string;
    style?: StyleProp<TextStyle>;
    fontSize?: number;
}) => {
    const [focused, setFocused] = useState(false);

    return (
        <View
            style={{
                alignSelf: 'stretch',
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 4,
                borderWidth: 1,
                borderColor: focused ? 'black' : 'gray',
            }}>
            <TextInput
                autoCorrect={false}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                style={[style, { fontSize: fontSize ?? 20 }]}
                onFocus={() => {
                    setFocused(true);
                }}
                onBlur={() => {
                    setFocused(false);
                }}
            />
        </View>
    );
};
