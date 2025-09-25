import { themes } from '@/lib/theme';
import { ThemeProvider, useTheme } from '@/lib/theme-context';
import * as Icons from "@expo/vector-icons";
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { cssInterop } from "nativewind";
import { useEffect, useState } from 'react';
import { Modal, Platform, Pressable, Text, View } from 'react-native';
import 'react-native-reanimated';
import './global.css';


Object.keys(Icons).forEach((iconKey) => {
  const IconComponent = (Icons as Record<string, any>)[iconKey];

  if (IconComponent) {
    cssInterop(IconComponent, {
      className: {
        target: "style",
        nativeStyleToProp: { height: true, width: true },
      },
    });
  }
});



function AppLayout() {
  const { theme } = useTheme();
  const [showWebAlert, setShowWebAlert] = useState(false);

  useEffect(() => {
    // Show alert only in web mode
    if (Platform.OS === 'web') {
      setShowWebAlert(true);
    }
  }, []);

  return (
    <View style={themes[theme]} className="flex-1">
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      <StatusBar style="auto" />

     {Platform.OS === 'web' && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={showWebAlert}
          onRequestClose={() => setShowWebAlert(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-background m-5 p-6 rounded-xl w-[90%] max-w-[500px]">
              <Text className="text-xl font-bold text-foreground mb-4">Web Support Notice</Text>
              <Text className="text-foreground mb-4">
                Some components in web mode may not work as expected. This library was primarily designed for iOS and Android platforms.
              </Text>
              <Text className="text-foreground mb-6">
                Pull requests to improve web (or other) compatibility are welcome and appreciated!
              </Text>
              <Pressable
                onPress={() => setShowWebAlert(false)}
                className="bg-primary py-3 rounded-lg items-center"
              >
                <Text className="text-primary-foreground font-medium">Got it</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <AppLayout />
    </ThemeProvider>
  );
}
