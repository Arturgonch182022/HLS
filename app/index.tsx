import {Text, View, StyleSheet, useWindowDimensions, ImageBackground, Platform,} from 'react-native';
import { Link } from 'expo-router';

export default function Index() {
    const { width, height } = useWindowDimensions();
    const isDesktop = width > 768;
    const isWeb = Platform.OS === 'web';

    const menuWidth = isDesktop ? '30%' : '100%';

    const backgroundImageSource = isWeb
        ? require('./images/Pokecut_1743240244453.jpg')
        : require('./images/Pokecut_1743240403662.jpg');

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={backgroundImageSource}
                resizeMode="cover"
                style={[styles.backgroundImage, { width: width, height: height }]}
            >
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>Human life safety</Text>
                    <View style={[styles.menu, { width: menuWidth }]}>
                        <Link href="/lectures" style={styles.menuItem}>
                            Lectures
                        </Link>
                        <Link href="/presentations" style={styles.menuItem}>
                            Presentations
                        </Link>
                        <Link href="/practice" style={styles.menuItem}>
                            Practices
                        </Link>
                        <Link href="/vocabulary" style={styles.menuItem}>
                            Dictionary
                        </Link>
                    </View>
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>© 2025 My Textbook. All rights reserved.</Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    title: {
        color: '#333',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 10,
        borderRadius: 5,
    },
    menu: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    menuItem: {
        backgroundColor: 'rgba(224, 224, 224, 0.8)',
        color: '#333',
        padding: 15,
        borderRadius: 8,
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    footer: {
        backgroundColor: 'rgba(208, 208, 208, 0.8)',
        width: '100%',
        paddingVertical: 10,
        alignItems: 'center',
    },
    footerText: {
        color: '#333',
        fontSize: 12,
    },
});