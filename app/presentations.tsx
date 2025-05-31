import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Platform, ActivityIndicator, Modal } from 'react-native';
import { WebView } from 'react-native-webview';
import { Asset } from 'expo-asset';

interface Presentation {
    id: string;
    title: string;
    htmlAsset: Asset;
}

const presentationAssets = {
    pres1: Asset.fromModule(require('../assets/presentation/new1. Введение.html')),
    pres2: Asset.fromModule(require('../assets/presentation/Energia_i_ee_vidy_ок.html')),
    pres3: Asset.fromModule(require('../assets/presentation/1_Физ_природа_и_источники_рад_опасности (1).html')),
    pres4: Asset.fromModule(require('../assets/presentation/2. Катастрофа на ЧАЭС (1).html')),
    pres5: Asset.fromModule(require('../assets/presentation/2. Система защиты от ЧС.html')),
    pres6: Asset.fromModule(require('../assets/presentation/3_Биоэффекты_воздействия_излучения.html')),
    pres7: Asset.fromModule(require('../assets/presentation/3. Подготовка населения в области защиты от ЧС.html')),
    pres8: Asset.fromModule(require('../assets/presentation/4. Защ.нас.при авариях на АЭС.html')),
    pres9: Asset.fromModule(require('../assets/presentation/4. Обеспечение пожарной безопасности на объектах1.html')),
    pres10: Asset.fromModule(require('../assets/presentation/5. Безопасность и действия граждан при пожарах в зданиях.html')),
    pres11: Asset.fromModule(require('../assets/presentation/6. Предупреждение ЧС на ХОО.html')),
    pres12: Asset.fromModule(require('../assets/presentation/7. Activities to revitalize the body.html')),
    pres13: Asset.fromModule(require('../assets/presentation/8. Electrocution, burns, drowning.html')),
    pres14: Asset.fromModule(require('../assets/presentation/Fires.html')),
    pres15: Asset.fromModule(require('../assets/presentation/Возобновляемые_источники_энергии.html')),
    pres16: Asset.fromModule(require('../assets/presentation/Законодательство_РБ_в_области_охраны_труда.html')),
    pres17: Asset.fromModule(require('../assets/presentation/Законодательство_Республики_Беларусь_в_области_охраны_окружающей.html')),
    pres18: Asset.fromModule(require('../assets/presentation/Земляные_работы_New.html')),
    pres19: Asset.fromModule(require('../assets/presentation/Основные_источники_и_последствия_загрязнения_питьевой_воды_БЖЧизменено20.html')),
};

const presentationsData: Presentation[] = [
    { id: '1', title: 'Presentation 1: Introduction', htmlAsset: presentationAssets.pres1 },
    { id: '2', title: 'Presentation 2: Fuel and energy resources in the Republic of Belarus and methodsRepublic of Belarus and methods of obtaining energyof obtaining energy', htmlAsset: presentationAssets.pres2 },
    { id: '3', title: 'Presentation 3: Physical nature and sourcesPhysical nature and sourcesradiation hazardradiation hazard', htmlAsset: presentationAssets.pres3 },
    { id: '4', title: 'Presentation 4: Radioecological situation in the Republic of Belarus afterdisaster at the Chernobyl nuclear power plant', htmlAsset: presentationAssets.pres4 },
    { id: '5', title: 'Presentation 5: System of protection againstSystem of protection against natural and man-madenatural and man-made emergenciesemergencies', htmlAsset: presentationAssets.pres5 },
    { id: '6', title: 'Presentation 6: Biological effectsBiological effectseffects of ionizing radiation on theeffects of ionizing radiation on the human bodyhuman body', htmlAsset: presentationAssets.pres6 },
    { id: '7', title: 'Presentation 7: Training the population in the field of protection against natural and man-made emergencies', htmlAsset: presentationAssets.pres7 },
    { id: '8', title: 'Presentation 8: Basic measures to protect the population from radiation exposure during accidents at nuclear power plants', htmlAsset: presentationAssets.pres8 },
    { id: '9', title: 'Presentation 9: Ensuring fire safety at industrial andEnsuring fire safety at industrial and civil facilitiescivil facilitie', htmlAsset: presentationAssets.pres9 },
    { id: '10', title: 'Presentation 10: Ensuring safety and procedures forEnsuring safety and procedures for citizens in case of fires in buildingscitizens in case of fires in build', htmlAsset: presentationAssets.pres10 },
    { id: '11', title: 'Presentation 11: Emergency preventionEmergency preventionsituations at chemically hazardous facilities', htmlAsset: presentationAssets.pres11 },
    { id: '12', title: 'Presentation 12: ResuscitationResuscitation measures measure', htmlAsset: presentationAssets.pres12 },
    { id: '13', title: 'Presentation 13: First-aid in case of electric shock, flame burns, frostbite, drowning', htmlAsset: presentationAssets.pres13 },
    { id: '14', title: 'Presentation 14: Fires in buildings and theirFires in buildings and theirFires in buildings and their prevention measuresprevention measuresprevention measures', htmlAsset: presentationAssets.pres14 },
    { id: '15', title: 'Presentation 15: Renewable Energy', htmlAsset: presentationAssets.pres15 },
    { id: '16', title: 'Presentation 16: Legislation of the Republic of Belarus in the field of labor protection. Providing protection from hazardous and harmful production factors', htmlAsset: presentationAssets.pres16 },
    { id: '17', title: 'Presentation 17: Legislation of the Republic of Belarus in the field of environmental protection and rational use of natural resources', htmlAsset: presentationAssets.pres17 },
    { id: '18', title: 'Presentation 18: Safety of earthing and construction work at home', htmlAsset: presentationAssets.pres18 },
    { id: '19', title: 'Presentation 19: Environmentalnutrition problems.Main sources and consequences drinking water pollutionwater', htmlAsset: presentationAssets.pres19 },
];

export default function Presentations() {
    const [selectedPresentation, setSelectedPresentation] = React.useState<Presentation | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [localUri, setLocalUri] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (selectedPresentation) {
            setLoading(true);
            loadHtmlFile(selectedPresentation.htmlAsset)
                .finally(() => setLoading(false));
        }
    }, [selectedPresentation]);

    const loadHtmlFile = async (asset: Asset) => {
        try {
            await asset.downloadAsync();
            setLocalUri(asset.localUri || asset.uri);
        } catch (error) {
            console.error('Error loading HTML asset:', error);
        }
    };

    const renderItem = ({ item }: { item: Presentation }) => (
        <TouchableOpacity
            style={styles.listItem}
            onPress={() => {
                if (selectedPresentation && selectedPresentation.id === item.id) {
                    setSelectedPresentation(null);
                } else {
                    setSelectedPresentation(item);
                }
            }}
        >
            <Text style={styles.listItemText}>{item.title}</Text>
        </TouchableOpacity>
    );

    const renderPresentationContent = () => {
        if (!selectedPresentation || !localUri) return null;

        return (
            <Modal
                visible={!!selectedPresentation}
                animationType="slide"
                onRequestClose={() => setSelectedPresentation(null)}
            >
                <View style={styles.presentationContainer}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setSelectedPresentation(null)}
                    >
                        <Text style={styles.closeButtonText}>×</Text>
                    </TouchableOpacity>
                    <Text style={styles.presentationTitle}>{selectedPresentation.title}</Text>
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
                            />
                        )
                    )}
                </View>
            </Modal>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>List of presentations</Text>
            <FlatList
                data={presentationsData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={styles.list}
            />
            {renderPresentationContent()}
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
    presentationContainer: {
        flex: 1,
        marginTop: 20,
        borderWidth: 1,
        borderColor: 'rgba(204, 204, 204, 1)',
        borderRadius: 8,
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    presentationTitle: {
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