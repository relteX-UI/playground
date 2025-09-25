import { Header } from '@/components/header';
import { ThemeToggle } from '@/components/theme-toggle';
import { useTheme } from '@/lib/theme-context';
import { Stack, usePathname, useRouter } from 'expo-router';

export default function ComponentsLayout() {
    const { theme } = useTheme();
    const router = useRouter();
    const pathname = usePathname();

    const componentName = pathname.split('/').pop()?.replace('Example', '') || 'Component';
    const formattedComponentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);

    return (
        <Stack
            screenOptions={{
                headerShown: true,
                header: () => (
                    <Header
                        title={formattedComponentName}
                        showBackButton={true}
                        rightContent={<ThemeToggle />}
                        className="bg-background border-b border-border"
                        titleClassName="text-foreground"
                    />
                ),
            }}
        >
            <Stack.Screen name="[...component]" />
        </Stack>
    );
}