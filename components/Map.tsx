import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Alert } from "react-native";
import { Button } from "react-native-elements";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import Colors from "../constants/Colors";

const LOCATION_SETTINGS = {
    accuracy: Location.Accuracy.Balanced,
    timeInterval: 2000,
    distanceInterval: 15,
};

interface ILocation {
    latitude: number;
    longitude: number;
}

const Map = () => {
    const [location, setLocation] = useState<ILocation>({
        latitude: 0,
        longitude: 0,
    });

    const mapRef = React.createRef<MapView>();

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== "granted") {
            Alert.alert(
                "Insufficent Permissions!",
                "You need to grant location permissions to use this app.",
                [{ text: "Okay" }]
            );
            return false;
        }
        return true;
    };

    const getLocationHandler = async () => {
        const hasPermissions = await verifyPermissions();
        if (!hasPermissions) {
            return;
        }

        try {
            const currentLocation = Location.getCurrentPositionAsync({
                timeout: 5000,
            });
            console.log(location);
            currentLocation.then((res) => {
                const { latitude, longitude } = res.coords;
                setLocation({
                    latitude,
                    longitude,
                });
            });
        } catch (err) {
            Alert.alert("Could not fetch location!", "Please try again.", [
                { text: "Okay" },
            ]);
        }
    };

    const watchPositionHanlder = async () => {
        const hasPermissions = await verifyPermissions();
        if (!hasPermissions) {
            return;
        }

        try {
            Location.watchPositionAsync(LOCATION_SETTINGS, (loc) => {
                const { latitude, longitude } = loc.coords;
                setLocation({ latitude, longitude });
            });
        } catch (err) {
            Alert.alert("Could not fetch location!", "Please try again.", [
                { text: "Okay" },
            ]);
        }
    };

    const moveToCurrentLocation = () => {
        mapRef.current!.animateToRegion({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.02,
        });
    };

    useEffect(() => {
        getLocationHandler();
        watchPositionHanlder();

        // Location.watchPositionAsync(LOCATION_SETTINGS, (loc) => {
        //     const { latitude, longitude } = loc.coords;
        //     setLocation({ latitude, longitude });
        // });
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                // initialRegion={{
                //     latitude: location?.latitude!,
                //     longitude: location?.longitude!,
                //     latitudeDelta: 0.0922,
                //     longitudeDelta: 0.0421,
                // }}
                showsUserLocation
                pitchEnabled={false}
                region={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.02,
                }}
            />
            <View style={styles.button}>
                <Button
                    onPress={moveToCurrentLocation}
                    icon={{
                        name: "near-me",
                        type: "materials-icons",
                        size: 29,
                        color: Colors.dark.background,
                    }}
                    buttonStyle={{
                        backgroundColor: "white",
                        width: 35,
                        height: 38,
                    }}
                    iconContainerStyle={{
                        marginHorizontal: -5,
                        marginVertical: -6,
                    }}
                    raised
                />
            </View>
        </View>
    );
};

// let { height, width } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
    },
    map: {
        flex: 1,
    },
    button: {
        position: "absolute",
        top: "80%",
        alignSelf: "flex-end",
        padding: 20,
    },
});

export default Map;
