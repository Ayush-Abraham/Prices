import { useContext, useEffect, useState } from "react";
import { Text } from "react-native-svg";
import Price from "../model/Price";
import { DbContext } from "../App";
import { Collection, Q } from "@nozbe/watermelondb";
import { FlatList, View } from "react-native";
import SinglePrice from "./SinglePrice";

function PricesBox(props: { item_id: string; prices: Price[] }) {

    const { item_id, prices } = props;

    // const [prices, setPrices] = useState<Price[]>([]);
    const [count, setCount] = useState(0);
    // const isFocused = useIsFocused();

    const database = useContext(DbContext)

    // useEffect(() => {
    //     async function fetchPrices() {
    //         const pricesCollection: Collection<Price> = database.collections.get('prices')
    //         const foundPrices: Price[] = await pricesCollection.query(
    //             Q.where('item_id', item_id)
    //         ).fetch()
    //         setPrices(foundPrices);
    //     }

    //     fetchPrices().catch(console.error)

    // }, [count]) //isfocused

    return (
        <View>
            <FlatList
                data={prices}
                keyExtractor={(price) => price.id.toString()}
                renderItem={({ item }) => <SinglePrice priceDetail={item}/>}
            />
        </View>

    );
}

export default PricesBox