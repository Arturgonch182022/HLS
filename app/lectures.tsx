import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Platform, ActivityIndicator, Modal } from 'react-native';
import { WebView } from 'react-native-webview';
import { Asset } from 'expo-asset';

interface Lecture {
    id: string;
    title: string;
    htmlAsset: Asset;
}

const lectureAssets = {
    lecture1: Asset.fromModule(require('../assets/lectures/1_lecture.html')),
    lecture2: Asset.fromModule(require('../assets/lectures/2_lecture.html')),
    lecture3: Asset.fromModule(require('../assets/lectures/3_lecture.html')),
    lecture4: Asset.fromModule(require('../assets/lectures/4_lecture.html')),
    lecture5: Asset.fromModule(require('../assets/lectures/5_lecture.html')),
    lecture6: Asset.fromModule(require('../assets/lectures/6_lecture.html')),
    lecture7: Asset.fromModule(require('../assets/lectures/7_lecture.html')),
    lecture8: Asset.fromModule(require('../assets/lectures/8_lecture.html')),
    lecture9: Asset.fromModule(require('../assets/lectures/9_lecture.html')),
    lecture10: Asset.fromModule(require('../assets/lectures/10_lecture.html')),
    lecture11: Asset.fromModule(require('../assets/lectures/11_lecture.html')),
    lecture12: Asset.fromModule(require('../assets/lectures/12_lecture.html')),
    lecture13: Asset.fromModule(require('../assets/lectures/13_lecture.html')),
    lecture14: Asset.fromModule(require('../assets/lectures/14_lecture.html')),
    lecture15: Asset.fromModule(require('../assets/lectures/15_lecture.html')),
};

const lecturesData: Lecture[] = [
    { id: '1', title: 'Lecture 1. The concept of emergency situations, their classification and brief characterisation. The system of defence against natural and man-made emergencies', htmlAsset: lectureAssets.lecture1 },
    { id: '2', title: 'Lecture 2. Training of the population in the field of defence from natural and man-made emergencies', htmlAsset: lectureAssets.lecture2 },
    { id: '3', title: 'Lecture 3. Ensuring fire safety at industrial and civil facilities', htmlAsset: lectureAssets.lecture3 },
    { id: '4', title: 'Lecture 4. Security and Procedure citizens in case of fires in buildings', htmlAsset: lectureAssets.lecture4 },
    { id: '5', title: 'Lecture 5. Prevention of emergencies at chemically hazardous facilities, organization and maintenance of chemical protection measures', htmlAsset: lectureAssets.lecture5 },
    { id: '6', title: 'Lecture 6. Conditions requiring first aid. Stopping breathing and blood circulation, measures to revive the body', htmlAsset: lectureAssets.lecture6 },
    { id: '7', title: 'Lecture 7. First aid for electric shock, lightning, flame burns, frostbite, drowning', htmlAsset: lectureAssets.lecture7 },
    { id: '8', title: 'Lecture 8. Radioecological situation in the Republic of Belarus after the Chernobyl disaster', htmlAsset: lectureAssets.lecture8 },
    { id: '9', title: 'Lecture 9. Biological effects of ionizing radiation on the human body', htmlAsset: lectureAssets.lecture9 },
    { id: '10', title: 'Lecture 10. Basic measures to protect the population from radiation exposure during accidents at nuclear power plants', htmlAsset: lectureAssets.lecture10 },
    { id: '11', title: 'Lecture 11. Ecological problems of nutrition. Main sources and consequences of drinking water pollution', htmlAsset: lectureAssets.lecture11 },
    { id: '12', title: 'Lecture 12. Legislation of the Republic of Belarus in the field of environmental protection and rational use of natural resources', htmlAsset: lectureAssets.lecture12 },
    { id: '13', title: 'Lecture 13. Fuel and energy resources in the Republic of Belarus and traditional methods of obtaining thermal and electrical energy', htmlAsset: lectureAssets.lecture13 },
    { id: '14', title: 'Lecture 14. Renewable energy sources', htmlAsset: lectureAssets.lecture14 },
    { id: '15', title: 'Lecture 15. Legislation of the Republic of Belarus in the field of labor protection. Ensuring protection from hazardous and harmful production factors', htmlAsset: lectureAssets.lecture15 },
];

export default function Lectures() {
    const [selectedLecture, setSelectedLecture] = React.useState<Lecture | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [localUri, setLocalUri] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (selectedLecture) {
            setLoading(true);
            loadHtmlFile(selectedLecture.htmlAsset)
                .finally(() => setLoading(false));
        }
    }, [selectedLecture]);

    const loadHtmlFile = async (asset: Asset) => {
        try {
            await asset.downloadAsync();
            setLocalUri(asset.localUri || asset.uri);
        } catch (error) {
            console.error('Error loading HTML asset:', error);
        }
    };

    const renderItem = ({ item }: { item: Lecture }) => (
        <TouchableOpacity
            style={styles.listItem}
            onPress={() => {
                if (selectedLecture && selectedLecture.id === item.id) {
                    setSelectedLecture(null);
                } else {
                    setSelectedLecture(item);
                }
            }}
        >
            <Text style={styles.listItemText}>{item.title}</Text>
        </TouchableOpacity>
    );

    const renderLectureContent = () => {
        if (!selectedLecture || !localUri) return null;

        return (
            <Modal
                visible={!!selectedLecture}
                animationType="slide"
                onRequestClose={() => setSelectedLecture(null)}
            >
                <View style={styles.lectureContainer}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setSelectedLecture(null)}
                    >
                        <Text style={styles.closeButtonText}>×</Text>
                    </TouchableOpacity>
                    <Text style={styles.lectureTitle}>{selectedLecture.title}</Text>
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
                                scalesPageToFit={false} // Отключаем авто-масштабирование
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
            <Text style={styles.header}>List of lectures</Text>
            <FlatList
                data={lecturesData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={styles.list}
            />
            {renderLectureContent()}
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
    lectureContainer: {
        flex: 1,
        marginTop: 20,
        borderWidth: 1,
        borderColor: 'rgba(204, 204, 204, 1)',
        borderRadius: 8,
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    lectureTitle: {
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