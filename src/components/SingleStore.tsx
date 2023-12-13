import { Button, Text, View } from "react-native";
import Store from "../model/Store";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../StackParamList";



function SingleStore(props: { store: Store; }): React.JSX.Element {

    const { store } = props;

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    // function handleShowDetails() {
    //     navigation.navigate('StoreDetail', { store_id: store.id })
    // }


    return (
        <View>
            {/* <Text>{item.item_name}</Text> */}
            <Text>{store.store_name}</Text>
            <Button
                title={'Delete'}
                // onPress={handleShowDetails}
            />
        </View>
    );
}

export default SingleStore;