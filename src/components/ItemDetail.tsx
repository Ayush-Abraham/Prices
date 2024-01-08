import { Alert, Button, Pressable, Text, View } from "react-native";
import Item from "../model/Item";
import { ItemDetailRouteProp, PriceDetail, RootStackParamList } from "../types";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { DbContext } from "../App";
import { useContext, useEffect, useState } from 'react';
import { Collection, Q } from "@nozbe/watermelondb";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import PriceForm from "./PriceForm";
import Price from "../model/Price";
import PricesBox from "./PricesBox";
import PricesChart from "./PricesChart";
import Store from "../model/Store";
import { StoreMap } from "../types";
import { modalStyles, singleViewStyles } from "./styles/Styles";


function ItemDetail() {

    const route = useRoute<ItemDetailRouteProp>();
    const { item_id } = route.params

    const database = useContext(DbContext)
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [item, setItem] = useState<Item>();
    const [showPriceForm, setShowPriceForm] = useState(false)
    const [count, setCount] = useState(0)
    const [priceDetails, setPriceDetails] = useState<PriceDetail>({
        prices: [],
        storeMap: {
            'a': {
                store_name: 'a',
                store_colour: 'red'
            }
        }
    });

    useEffect(() => {

        navigation.setOptions({
            headerRight: () => (
                <Pressable
                    style={singleViewStyles.deleteButton}
                    onPress={handleDeleteItem}
                >
                    <Text style={singleViewStyles.buttonText}>Delete Item</Text>

                </Pressable>
                )
            
        })

        async function fetchItemDetails() {
            const itemsCollection: Collection<Item> = database.collections.get('items')
            const foundItems: Item[] = await itemsCollection.query(
                Q.where('id', item_id)
            ).fetch()
            setItem(foundItems[0])

            const pricesCollection: Collection<Price> = database.collections.get('prices')
            const foundPrices: Price[] = await pricesCollection.query(
                Q.where('item_id', item_id)
            ).fetch()
            // setPrices(foundPrices);

            const storeCollection: Collection<Store> = database.collections.get('stores')
            const allStores = await storeCollection.query().fetch()

            console.log("allStores")
            console.log(allStores)


            const calcStoreMap: StoreMap = allStores.reduce(
                (acc, obj) => {
                    const { id, store_name, colour } = obj
                    acc[id] = {
                        store_name: store_name,
                        store_colour: colour
                    }
                    return acc
                },
                {} as StoreMap
            )

            console.log('calc store map')
            console.log(calcStoreMap)


            setPriceDetails(
                {
                    prices: foundPrices,
                    storeMap: calcStoreMap
                }
            )

            console.log('store Map')
            console.log(priceDetails.storeMap)

        }

        fetchItemDetails().catch(() => { console.error })
    }, [count])

    useEffect(() => {
        navigation.setOptions({ title: item?.item_name })
    }, [item])

    async function handleDeleteItem() {

        Alert.alert('Are you sure?', 'Deleting this item will also delete all its pricing info', [
            {
                text: 'Delete',
                onPress: deleteItem
            },
            {
                text: 'Cancel',
            }
        ])
    }

    async function deleteItem() {

        await database.write(async () => {
            const itemsCollection: Collection<Item> = database.collections.get('items')
            const foundItems: Item[] = await itemsCollection.query(
                Q.where('id', item_id)
            ).fetch()
            await foundItems[0].destroyPermanently().catch(console.error)

            const pricesCollection: Collection<Price> = database.collections.get('prices')
            const foundPrices: Price[] = await pricesCollection.query(
                Q.where('item_id', item_id)
            ).fetch()

            for (let i = 0; i < foundPrices.length; i++) {
                await foundPrices[i].destroyPermanently().catch(console.error)
            }

            navigation.goBack()
        })
    }


    function refresh() {
        setCount(count + 1)
    }


    return (
        <View>

            {/* <Button
                title="Delete item"
                onPress={handleDeleteItem}
            /> */}
            {/* <Button
                title={showPriceForm ? 'Back' : "Add new price"}
                onPress={() => { setShowPriceForm(!showPriceForm) }}
            /> */}
            <Pressable
                style={[modalStyles.button, modalStyles.buttonAdd]}
                onPress={() => setShowPriceForm(true)}
            >
                <Text style={modalStyles.textStyle}>Add New Observation</Text>
            </Pressable>

            <PriceForm
                item_id={item_id}
                isVisible={showPriceForm}
                setVisible={setShowPriceForm}
                itemDetailsRefresh={refresh}
            />
            <PricesChart priceDetails={priceDetails} />
            <PricesBox item_id={item_id} priceDetails={priceDetails} itemDetailsRefresh={refresh} />
            <Text>Item details end</Text>
        </View>
    );
}

export default ItemDetail;