import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Platform, ActivityIndicator, Modal } from 'react-native';
import { WebView } from 'react-native-webview';
import { Asset } from 'expo-asset';

interface Practice {
    id: string;
    title: string;
    htmlAsset: Asset;
}

const practiceAssets = {
    practice1: Asset.fromModule(require('../assets/practice/Class 1.html')),
    practice2: Asset.fromModule(require('../assets/practice/Practical work No.html')),
    practice3: Asset.fromModule(require('../assets/practice/пз2english.html')),
    practice4: Asset.fromModule(require('../assets/practice/Practical_1.html')),
    practice5: Asset.fromModule(require('../assets/practice/Practical_2.html')),
    practice6: Asset.fromModule(require('../assets/practice/Practical_3.html')),
    practice7: Asset.fromModule(require('../assets/practice/Practical_4.html')),
    practice8: Asset.fromModule(require('../assets/practice/Practical_5.html')),
    practice9: Asset.fromModule(require('../assets/practice/Practical_6.html')),
};

const practiceData: Practice[] = [
    { id: '1', title: 'Practice 1: Training of the population in the field of defence against natural and man-made emergencies', htmlAsset: practiceAssets.practice1 },
    { id: '2', title: 'Practice 2: Defeat by poisonous substances. Ways of penetration into the body, signs, first aid, care. Emergency care in acute poisoning', htmlAsset: practiceAssets.practice2 },
    { id: '3', title: 'Practice 3: Familiarisation with portable dosimeters and training in their use', htmlAsset: practiceAssets.practice3 },
    { id: '4', title: 'Practice 4: Training the population in the field of protection from natural and man-made emergencies', htmlAsset: practiceAssets.practice4 },
    { id: '5', title: 'Practice 5: Ensuring safety and the procedure for citizens to follow in the event of fires in buildings', htmlAsset: practiceAssets.practice5 },
    { id: '6', title: 'Practice 6: Ensuring the safety of passenger transportation services on public transport and the procedure for passengers to follow in the event of dangerous incidents', htmlAsset: practiceAssets.practice6 },
    { id: '7', title: 'Practice 7: Conditions requiring first aid. Respiratory and circulatory arrest, measures to revive the body', htmlAsset: practiceAssets.practice7 },
    { id: '8', title: 'Practice 8: First aid for electric shock, lightning, flame burns, frostbite, drowning', htmlAsset: practiceAssets.practice8 },
    { id: '9', title: 'Practice 9: First aid for wounds, external bleeding, bone fractures', htmlAsset: practiceAssets.practice9 },
];

export default function Practices() {
    const [selectedPractice, setSelectedPractice] = React.useState<Practice | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [localUri, setLocalUri] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (selectedPractice) {
            setLoading(true);
            loadHtmlFile(selectedPractice.htmlAsset)
                .finally(() => setLoading(false));
        }
    }, [selectedPractice]);

    const loadHtmlFile = async (asset: Asset) => {
        try {
            await asset.downloadAsync();
            setLocalUri(asset.localUri || asset.uri);
        } catch (error) {
            console.error('Error loading HTML asset:', error);
        }
    };

    const renderItem = ({ item }: { item: Practice }) => (
        <TouchableOpacity
            style={styles.listItem}
            onPress={() => {
                if (selectedPractice && selectedPractice.id === item.id) {
                    setSelectedPractice(null);
                } else {
                    setSelectedPractice(item);
                }
            }}
        >
            <Text style={styles.listItemText}>{item.title}</Text>
        </TouchableOpacity>
    );

    const renderPracticeContent = () => {
        if (!selectedPractice || !localUri) return null;

        return (
            <Modal
                visible={!!selectedPractice}
                animationType="slide"
                onRequestClose={() => setSelectedPractice(null)}
            >
                <View style={styles.practiceContainer}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setSelectedPractice(null)}
                    >
                        <Text style={styles.closeButtonText}>×</Text>
                    </TouchableOpacity>
                    <Text style={styles.practiceTitle}>{selectedPractice.title}</Text>
                    {loading ? (
                        <ActivityIndicator size="large" color="rgba(0, 0, 255, 0.8)" />
                    ) : (
                        Platform.OS === 'web' ? (
                            <iframe
                                src={localUri}
                                style={styles.webView}
                            />
                        ) : (
                            <WebView
                                originWhitelist={['*']}
                                source={{ uri: localUri }}
                                allowFileAccess={true}
                                allowUniversalAccessFromFileURLs={true}
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                                mixedContentMode="always"
                                style={styles.webView}
                                startInLoadingState={true}
                                scalesPageToFit={false}
                                injectedJavaScriptBeforeContentLoaded={`
    const style = document.createElement('style');
    style.textContent = \`
      body {
        font-size: 10px !important;
        line-height: 1.6 !important;
        padding: 15px !important;
        text-align: justify !important;
        color: #333 !important;
      }
      p, li, td, div, span {
        font-size: inherit !important;
      }
      h1 { font-size: 28px !important; }
      h2 { font-size: 26px !important; }
      h3 { font-size: 24px !important; }
      img, iframe {
        max-width: 100% !important;
        height: auto !important;
      }
      table {
        width: 100% !important;
        font-size: 20px !important;
      }
    \`;
    document.head.appendChild(style);
    
    const viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.5, maximum-scale=2.0, user-scalable=yes';
      document.head.appendChild(meta);
    } else {
      viewport.content = 'width=device-width, initial-scale=1.5, maximum-scale=2.0, user-scalable=yes';
    }
  `}
                            />
                        )
                    )}
                </View>
            </Modal>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>List of practices</Text>
            <FlatList
                data={practiceData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={styles.list}
            />
            {renderPracticeContent()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(240, 240, 240, 1)',
        padding: 20,
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        color: 'rgba(0, 0, 0, 0.87)',
    },
    list: {
        flex: 1,
    },
    listItem: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: 'rgba(204, 204, 204, 1)',
    },
    listItemText: {
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.87)',
    },
    practiceContainer: {
        flex: 1,
        marginTop: 20,
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    practiceTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'rgba(0, 0, 0, 0.87)',
        textAlign: 'center',
    },
    webView: {
        flex: 1,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
        padding: 10,
    },
    closeButtonText: {
        fontSize: 24,
        color: '#333',
    },
});