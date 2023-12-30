import { useContext, useEffect, useState } from "react";
import { Text } from "react-native-svg";
import Price from "../model/Price";
import { DbContext } from "../App";
import { Collection, Q } from "@nozbe/watermelondb";
import { FlatList, ScrollView, View } from "react-native";
import SinglePrice from "./SinglePrice";
import { PriceDetail, StoreMap } from "../types";

function PricesBox(props: { item_id: string; priceDetails: PriceDetail, itemDetailsRefresh: () => void }) {

    const { item_id, priceDetails, itemDetailsRefresh } = props;
    const prices = priceDetails.prices
    const storeMap = priceDetails.storeMap

    // const [prices, setPrices] = useState<Price[]>([]);
    const [count, setCount] = useState(0);
    // const isFocused = useIsFocused();

    // const database = useContext(DbContext)

    console.log(prices.map(obj => obj.store_id))

    console.log('pricesbox storemap')
    console.log(storeMap)


    return (
        <View style={{flexGrow: 1}}>
            <FlatList
                data={prices}
                keyExtractor={(price) => price.id.toString()}
                renderItem={({ item }) =>
                    <SinglePrice
                        price={item}
                        store_name={storeMap[item.store_id].store_name}
                        store_colour={storeMap[item.store_id] ? storeMap[item.store_id].store_colour : 'red'}
                        itemDetailsRefresh={itemDetailsRefresh}
                    />}
                contentContainerStyle={{flexGrow: 1, paddingBottom: 5}}
            />
        </View>
    );
}

export default PricesBox