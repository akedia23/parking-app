import * as Linking from "expo-linking";

export default {
    prefixes: [Linking.makeUrl("/")],
    config: {
        screens: {
            Root: {
                screens: {
                    Park: {
                        screens: {
                            ParkScreen: "park",
                        },
                    },
                    // TabTwo: {
                    //   screens: {
                    //     TabTwoScreen: 'two',
                    //   },
                    // },
                },
            },
            NotFound: "*",
        },
    },
};
