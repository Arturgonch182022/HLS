import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="presentations"
                options={{ title: 'Presentations' }}
            />
            <Stack.Screen
                name="practice"
                options={{ title: 'Practices' }}
            />
            <Stack.Screen
                name="vocabulary"
                options={{ title: 'Dictionary' }}
            />
            <Stack.Screen
                name="lectures"
                options={{ title: 'Lectures' }}
            />
        </Stack>
    );
}