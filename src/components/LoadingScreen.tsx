import { View, Text } from "react-native";
import { loadingStyles } from "./styles/Styles";


function LoadingScreen() {
    return(
        <View style={loadingStyles.container}>
            <Text>
                Loading...
            </Text>
        </View>
    )
}

export default LoadingScreen