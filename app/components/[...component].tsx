import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

export default function DynamicComponentScreen() {

    const params = useLocalSearchParams();

    return <View style={{ flex: 1 }} />;
}