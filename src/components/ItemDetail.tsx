import { Alert, Button, Text, View } from "react-native";
import Item from "../model/Item";
import { ItemDetailRouteProp, RootStackParamList } from "../StackParamList";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DbContext } from "../App";
import { useContext, useEffect, useState } from 'react';
import { Collection, Q } from "@nozbe/watermelondb";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import PriceForm from "./PriceForm";
import Price from "../model/Price";



function ItemDetail() {

    const route = useRoute<ItemDetailRouteProp>();
    const { item_id } = route.params

    const database = useContext(DbContext)
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [item, setItem] = useState<Item>();
    const [showPriceForm, setShowPriceForm] = useState(false)

    useEffect(() => {
        async function fetchItemDetails() {
            const itemsCollection: Collection<Item> = database.collections.get('items')
            const foundItems: Item[] = await itemsCollection.query(
                Q.where('id', item_id)
            ).fetch()
            setItem(foundItems[0])
        }

        fetchItemDetails().catch(()=> {console.error})

    }, [])

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


        // await database.write(async () => {
        //     const itemsCollection: Collection<Item> = database.collections.get('items')
        //     const foundItems: Item[] = await itemsCollection.query(
        //         Q.where('id', item_id)
        //     ).fetch()
        //     await foundItems[0].destroyPermanently().catch(console.error)
        //     navigation.goBack()
        // })    
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
            
            for (let i=0; i< foundPrices.length; i++) {
                await foundPrices[i].destroyPermanently().catch(console.error)
            }

            navigation.goBack()
        })    
    }



    return (
        <View>
            <Text>Item Details</Text>
            <Text>{item_id}</Text>
            <Text>{item?.item_name}</Text>
            <Button
                title="Delete item"
                onPress={handleDeleteItem}
            />
            <Button
                title={showPriceForm ? 'Back' : "Add new price"}
                onPress={()=>{setShowPriceForm(!showPriceForm)}}
            />
            {showPriceForm && <PriceForm/>}
        </View>
    );
}

export default ItemDetail;