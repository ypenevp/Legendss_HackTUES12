import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import "../global.css"
import { MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import { getAllWheelChair, postWheelChair } from '../services/wheelChair.js';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../context/UserContext.jsx';

export default function Monitoring() {
    const [wheelchairs, setWheelchairs] = useState([]);
    const [user] = useUser();
    const navigation = useNavigation();

    const fetchWheelchairs = async () => {
        try {
            const wheelchairsData = await getAllWheelChair();
            console.log("Data received on frontend:", wheelchairsData);
            setWheelchairs(wheelchairsData);
        } catch (error) {
            console.error("Error fetching wheelchairs:", error);
        }
    };

    const handleAddWheelchair = async () => {
        try {
            const newWheelchair = await postWheelChair();
            console.log("New wheelchair created:", newWheelchair);

            setWheelchairs(prev => [...prev, newWheelchair]);
        } catch (error) {
            console.error("Error creating new wheelchair:", error);
        }
    };


    useEffect(() => {
        fetchWheelchairs();
    }, []);


    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center', paddingTop: 20, paddingBottom: 20, flexDirection: 'column' }}>
            
            {user?.role === "RELATIVE" || user?.role === "CARETAKER" ? (
                <>\
                    <Text className="font-bold text-blue-500 text-4xl mb-4">All Wheelchairs</Text>
            
                    {wheelchairs.map((wheelchair) => (
                        <View key={wheelchair.id} className="bg-gray-100 rounded-lg p-4 m-2 w-[90%] border border-gray-300">
                            <Text className="text-gray-800 font-bold text-lg">Wheelchair #{wheelchair.id}</Text>
                            <Text className="text-gray-700">Speed: <Text className="font-bold">{wheelchair.speed} km/h</Text></Text>

                            <Text className="text-gray-700">Coordinates: {wheelchair.gpsCoordinate}</Text>

                            <Text className="text-gray-600 text-xl mt-2 text-underline">
                                Status: {wheelchair.panicStatus ? "PANIC" : "Normal"}
                            </Text>
                        </View>
                    ))}
                </>
            ) : (
                <TouchableOpacity onPress={handleAddWheelchair} style={{ flexDirection: "row", width: '100%', backgroundColor: '#3b82f6', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 9999, justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 16 }}>+</Text>
                </TouchableOpacity>
            )}

        </ScrollView>
    );
}