import React from 'react';
import { RecoilRoot } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootStackNavigation } from './src/navigation/RootStackNavigation';
import { RecoilCustomPersist } from './src/components/RecoilCustomPersist';

const App = () => {
    return (
        <RecoilRoot>
            <SafeAreaProvider>
                <RecoilCustomPersist>
                    <NavigationContainer>
                        <RootStackNavigation />
                    </NavigationContainer>
                </RecoilCustomPersist>
            </SafeAreaProvider>
        </RecoilRoot>
    );
};

export default App;
