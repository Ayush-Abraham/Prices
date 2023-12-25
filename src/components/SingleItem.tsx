import { Button, Text, View } from "react-native";
import Item from "../model/Item";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../types";



function SingleItem(props: { item: Item; }): React.JSX.Element {

    const { item } = props;

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    function handleShowDetails() {
        navigation.navigate('ItemDetail', {item_id: item.id})
    }


    return (
        <View>
            {/* <Text>{item.item_name}</Text> */}
            <Button
                title={item.item_name}
                onPress={handleShowDetails}
            />
        </View>
    );
}

export default SingleItem;