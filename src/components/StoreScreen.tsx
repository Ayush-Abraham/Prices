import { useContext, useEffect, useState } from "react";
import Store from "../model/Store";
import { FlatList, Pressable, Text, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Collection } from "@nozbe/watermelondb";
import { DbContext } from "../App";
import SingleStore from "./SingleStore";
import { modalStyles } from "./styles/Styles";
import StoreForm from "./StoreForm";



function StoreScreen() {

    const [stores, setStores] = useState<Store[]>([]);
    const [count, setCount] = useState(0);
    const [showStoreForm, setShowStoreForm] = useState(false);
    const isFocused = useIsFocused();

    const database = useContext(DbContext)

    useEffect(() => {
        async function fetchStores() {
            const storesCollection: Collection<Store> = database.collections.get('stores')
            const allStores: Store[] = await storesCollection.query().fetch()//.catch(()=> {console.log('FAILED TO FETCH 1')});
            setStores(allStores);
        }

        fetchStores().catch(() => { console.error })

    }, [count, isFocused])

    function refresh() {
        setCount(count + 1)
    }

    return (
        <View>

            <Pressable
                style={[modalStyles.button, modalStyles.buttonAdd]}
                onPress={() => setShowStoreForm(true)}
            >
                <Text style={modalStyles.textStyle}>Add Store</Text>
            </Pressable>

            <StoreForm                
                isVisible={showStoreForm}
                setVisible={setShowStoreForm}
                count={count}
                setCount={setCount}
            />



            <FlatList
                data={stores}
                keyExtractor={(store) => store.id.toString()}
                renderItem={({ item }) => <SingleStore store={item} storeScreenRefresh={refresh} />}
            />
        </View>

    );
}

export default StoreScreen