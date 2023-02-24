import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootStackNavigation } from './src/navigation/RootStackNavigation';

const App = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <RootStackNavigation />
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default App;
