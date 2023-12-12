import { withObservables } from '@nozbe/watermelondb/react'
import { Text, View } from "react-native";
import Item from '../model/Item';


function SingleItem(props: { item: Item; }): React.JSX.Element {

    const {item} = props;

    return (
        <View>
            <Text>{item.item_name}</Text>
        </View>
    );
}

const enhance = withObservables(['item'], ({ item }) => ({
    item
}))

const EnhancedItem = enhance(SingleItem)

export default EnhancedItem;
