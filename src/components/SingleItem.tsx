import { Button, Pressable, Text, View } from "react-native";
import Item from "../model/Item";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../types";
import { singleViewStyles } from "./styles/Styles";



function SingleItem(props: { item: Item; }): React.JSX.Element {

    const { item } = props;

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    function handleShowDetails() {
        navigation.navigate('ItemDetail', { item_id: item.id })
    }


    return (
        <View style={singleViewStyles.viewingCard}>
            {/* <Text>{item.item_name}</Text> */}
            <Pressable onPress={handleShowDetails}>
                <View style={{alignItems: 'center'}}>
                    <Text style={singleViewStyles.titleText}>{item.item_name}</Text>
                </View>
            </Pressable>

            {/* <Button
                title={item.item_name}
                onPress={handleShowDetails}
            /> */}
        </View>
    );
}

export default SingleItem;