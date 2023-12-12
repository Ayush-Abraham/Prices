import { Button, Text, View } from "react-native";
import Item from "../model/Item";



function SingleItem(props: { item: Item; }): React.JSX.Element {

    const { item } = props;

    return (
        <View>
            {/* <Text>{item.item_name}</Text> */}
            <Button
                title={item.item_name}
            />
        </View>
    );
}

export default SingleItem;