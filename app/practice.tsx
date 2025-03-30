import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Platform, ActivityIndicator, Modal } from 'react-native';
import { WebView } from 'react-native-webview';

interface Practice {
    id: string;
    title: string;
    htmlFile: any;
}

const practiceData: Practice[] = [
    { id: '1', title: 'Practice 1: Training of the population in the field of defence against natural and man-made emergencies', htmlFile: require('./practice/Class 1.html') },
    { id: '2', title: 'Practice 2: Defeat by poisonous substances. Ways of penetration into the body, signs, first aid, care. Emergency care in acute poisoning', htmlFile: require('./practice/Practical work No.html') },
    { id: '3', title: 'Practice 3: Familiarisation with portable dosimeters and training in their use', htmlFile: require('./practice/пз2english.html') },
    { id: '4', title: 'Practice 4: Training the population in the field of protection from natural and man-made emergencies', htmlFile: require('./practice/Practical_1.html') },
    { id: '5', title: 'Practice 5: Ensuring safety and the procedure for citizens to follow in the event of fires in buildings', htmlFile: require('./practice/Practical_2.html') },
    { id: '6', title: 'Practice 6: Ensuring the safety of passenger transportation services on public transport and the procedure for passengers to follow in the event of dangerous incidents', htmlFile: require('./practice/Practical_3.html') },
    { id: '7', title: 'Practice 7: Conditions requiring first aid. Respiratory and circulatory arrest, measures to revive the body', htmlFile: require('./practice/Practical_4.html') },
    { id: '8', title: 'Practice 8: First aid for electric shock, lightning, flame burns, frostbite, drowning', htmlFile: require('./practice/Practical_5.html') },
    { id: '9', title: 'Practice 9: First aid for wounds, external bleeding, bone fractures', htmlFile: require('./practice/Practical_6.html') },

];

export default function Practices() {
    const [selectedPractice, setSelectedPractice] = React.useState<Practice | null>(null);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (selectedPractice) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [selectedPractice]);

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
        if (!selectedPractice) return null;

        return (
            <Modal
                visible={!!selectedPractice}
                animationType="slide"
                onRequestClose={() => setSelectedPractice(null)}
            >
                <View style={styles.practiceContainer}>
                    <TouchableOpacity onPress={() => setSelectedPractice(null)}>
                        <Text style={styles.practiceTitle}>{selectedPractice.title}</Text>
                    </TouchableOpacity>
                    {loading ? (
                        <ActivityIndicator size="large" color="rgba(0, 0, 255, 0.8)" />
                    ) : (
                        Platform.OS === 'web' ? (
                            <iframe
                                src={selectedPractice.htmlFile}
                                style={styles.webView}
                            />
                        ) : (
                            <WebView
                                originWhitelist={['*']}
                                source={selectedPractice.htmlFile}
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
        //fontWeight: 'bold',
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
});