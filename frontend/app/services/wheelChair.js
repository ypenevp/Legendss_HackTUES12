import { API_URL } from '@env'
import AsyncStorage from "@react-native-async-storage/async-storage";

export const postWheelChair = async () => {
    try {
        const token = await AsyncStorage.getItem("access");

        if (!token) {
            throw new Error("No authentication token found");
        }

        const response = await fetch(`${API_URL}/api/wheelchairs/wheelchair/add`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        console.log("POST status:", response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error("POST error:", errorText);
            throw new Error(errorText);
        }

        const data = await response.json(); // 👈 ВАЖНО
        console.log("Created wheelchair:", data);

        return data;

    } catch (error) {
        console.error("POST wheelchair error:", error);
        throw error;
    }
};

export const getAllWheelChair = async() => {
    try {
        const token = await AsyncStorage.getItem("access");

        if(!token){
            console.error("No token found")
            return [];
        }

        const response = await fetch(`${API_URL}/api/wheelchairs/wheelchair/my/associated`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });

        if (response.ok){
            const data = await response.json();
            console.log("Wheelchairs data fetched successfully");
            return data;
        } else {
            const errorText = await response.text();
            console.error("Server Error Status:", response.status);
            console.error("Server Error Body:", errorText);
            throw new Error(`Failed to fetch wheelchairs: ${response.status}`);
        }
    } catch (error) {
        console.error("Error fetching wheelchairs data:", error);
        throw error;
    }
}