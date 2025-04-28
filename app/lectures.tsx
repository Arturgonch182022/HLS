import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Platform, ActivityIndicator, Modal } from 'react-native';
import { WebView } from 'react-native-webview';

interface Lecture {
    id: string;
    title: string;
    htmlFile: any;
}

const lecturesData: Lecture[] = [
    { id: '1', title: 'Lecture 1. The concept of emergency situations, their classification and brief characterisation. The system of defence against natural and man-made emergencies', htmlFile: require('../assets/lectures/1_lecture.html') },
    { id: '2', title: 'Lecture 2. Training of the population in the field of defence from natural and man-made emergencies', htmlFile: require('../assets/lectures/2_lecture.html') },
    { id: '3', title: 'Lecture 3. Ensuring fire safety at industrial and civil facilities', htmlFile: require('../assets/lectures/3_lecture.html') },
    { id: '4', title: 'Lecture 4. Security and Procedure citizens in case of fires in buildings', htmlFile: require('../assets/lectures/4_lecture.html') },
    { id: '5', title: 'Lecture 5. Prevention of emergencies at chemically hazardous facilities, organization and maintenance of chemical protection measures', htmlFile: require('../assets/lectures/5_lecture.html') },
    { id: '6', title: 'Lecture 6. Conditions requiring first aid. Stopping breathing and blood circulation, measures to revive the body', htmlFile: require('../assets/lectures/6_lecture.html') },
    { id: '7', title: 'Lecture 7. First aid for electric shock, lightning, flame burns, frostbite, drowning', htmlFile: require('../assets/lectures/7_lecture.html') },
    { id: '8', title: 'Lecture 8. Radioecological situation in the Republic of Belarus after the Chernobyl disaster', htmlFile: require('../assets/lectures/8_lecture.html') },
    { id: '9', title: 'Lecture 9. Biological effects of ionizing radiation on the human body', htmlFile: require('../assets/lectures/9_lecture.html') },
    { id: '10', title: 'Lecture 10. Basic measures to protect the population from radiation exposure during accidents at nuclear power plants', htmlFile: require('../assets/lectures/10_lecture.html') },
    { id: '11', title: 'Lecture 11. Ecological problems of nutrition. Main sources and consequences of drinking water pollution', htmlFile: require('../assets/lectures/11_lecture.html') },
    { id: '12', title: 'Lecture 12. Legislation of the Republic of Belarus in the field of environmental protection and rational use of natural resources', htmlFile: require('../assets/lectures/12_lecture.html') },
    { id: '13', title: 'Lecture 13. Fuel and energy resources in the Republic of Belarus and traditional methods of obtaining thermal and electrical energy', htmlFile: require('../assets/lectures/13_lecture.html') },
    { id: '14', title: 'Lecture 14. Renewable energy sources', htmlFile: require('../assets/lectures/14_lecture.html') },
    { id: '15', title: 'Lecture 15. Legislation of the Republic of Belarus in the field of labor protection. Ensuring protection from hazardous and harmful production factors', htmlFile: require('../assets/lectures/15_lecture.html') },
];

export default function Lectures() {
    const [selectedLecture, setSelectedLecture] = React.useState<Lecture | null>(null);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (selectedLecture) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }, [selectedLecture]);

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
        if (!selectedLecture) return null;

        return (
            <Modal
                visible={!!selectedLecture}
                animationType="slide"
                onRequestClose={() => setSelectedLecture(null)}
            >
                <View style={styles.lectureContainer}>
                    <TouchableOpacity onPress={() => setSelectedLecture(null)}>
                        <Text style={styles.lectureTitle}>{selectedLecture.title}</Text>
                    </TouchableOpacity>
                    {loading ? (
                        <ActivityIndicator size="large" color="rgba(0, 0, 255, 0.8)" />
                    ) : (
                        Platform.OS === 'web' ? (
                            <iframe
                                src={selectedLecture.htmlFile}
                                style={styles.webView}
                            />
                        ) : (
                            <WebView
                                originWhitelist={['*']}
                                source={selectedLecture.htmlFile}
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
});