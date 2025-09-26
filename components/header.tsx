import { cn } from '@/lib/utils';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type FeatherIconName = React.ComponentProps<typeof Feather>['name'];

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  backButtonIcon?: FeatherIconName;
  rightContent?: React.ReactNode;
  className?: string;
  titleClassName?: string;
}

export function Header({
  title,
  showBackButton = true,
  backButtonIcon = Platform.OS === 'ios' ? 'chevron-left' : 'arrow-left',
  rightContent,
  className,
  titleClassName,
}: HeaderProps) {
  // Replace navigation with router
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Modify this to work with expo-router
  const canGoBack = router.canGoBack();
  
  return (
    <SafeAreaView edges={['top']} className={cn(
      "bg-white dark:bg-gray-800",
      className
    )}>
      <View className="flex-row items-center h-12 px-2">
        {/* Zone gauche - Bouton retour */}
        <View className="w-10 items-center justify-center">
          {showBackButton && canGoBack && (
            <TouchableOpacity 
              // Change this to use router.back()
              onPress={() => router.back()}
              className="p-2"
              accessibilityLabel="Back"
              accessibilityRole="button"
            >
              <Feather name={backButtonIcon} size={20} color={isDark ? '#fff' : '#1f2937'} />
            </TouchableOpacity>
          )}
        </View>
        
        {/* Zone centrale - Titre avec position absolue pour un vrai centrage */}
        <View className="flex-1 items-center justify-center">
          <Text className={cn(
            "text-base font-medium text-gray-900 dark:text-white",
            titleClassName
          )}>
            {title}
          </Text>
        </View>
        
        {/* Zone droite - Contenu personnalisé (ThemeToggle) */}
        <View className="w-10 items-center justify-center">
          {rightContent}
        </View>
      </View>
    </SafeAreaView>
  );
}