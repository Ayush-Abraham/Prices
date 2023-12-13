import { useContext, useEffect, useState } from "react";
import Store from "../model/Store";
import { FlatList, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Collection } from "@nozbe/watermelondb";
import { DbContext } from "../App";
import SingleStore from "./SingleStore";



function StoreScreen() {

    const [stores, setStores] = useState<Store[]>([]);
    const [count, setCount] = useState(0);
    const isFocused = useIsFocused();

    const database = useContext(DbContext)

    useEffect(() => {
        async function fetchAllItems() {
            const storesCollection: Collection<Store> = database.collections.get('stores')
            const allStores: Store[] = await storesCollection.query().fetch()//.catch(()=> {console.log('FAILED TO FETCH 1')});
            setStores(allStores);
        }

        fetchAllItems().catch(() => { console.error })

    }, [count, isFocused])

    return (
        <View>
            <FlatList
                data={stores}
                keyExtractor={(store) => store.id.toString()}
                renderItem={({ item }) => <SingleStore store={item} />}
            />
        </View>

    );
}

export default StoreScreen