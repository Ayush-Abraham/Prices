import { Collection, Database, Q } from "@nozbe/watermelondb";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import Item from "../model/Item";
import ItemsBox from "./ItemsBox";
import { DbContext } from "../App";
import { useContext } from 'react';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../StackParamList";
import Store from "../model/Store";





const HomeScreen = () => {

    const database = useContext(DbContext)

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [count, setCount] = useState(0);
    const [newItemName, setNewItemName] = useState('');


    async function testAddItem() {
        await database.write(async () => {
            const itemCollection: Collection<Item> = database.collections.get('items')
            const newItem = await itemCollection.create(item => {
                item.item_name = 'testItem_Name__' + String(count)
            }).catch(console.error)
            console.log('inside testadditem')
            setCount(count + 1)
        })
    }
    
    async function testAddStore() {
        await database.write(async () => {
            const storeCollection: Collection<Store> = database.collections.get('stores')
            const newStore = await storeCollection.create(store => {
                store.store_name = 'test_store_Name__' + String(count)
            }).catch(console.error)
            console.log('inside testadd store')
        })
    }

    async function handleAddItem() {
        console.log('handleadditem')
        console.log(newItemName)

        const newItemNameTrimmed = newItemName.trim()

        if (newItemNameTrimmed.length == 0) {
            console.log('item name length shouldnt be zero')
        }
        else {
            await database.write(async () => {
                const itemCollection: Collection<Item> = database.collections.get('items')
                const n_existingItems = await itemCollection.query(
                    Q.where('item_name', newItemNameTrimmed)
                ).fetchCount()

                if (n_existingItems != 0) {
                    console.log('this name already exists')
                }
                else {
                    console.log(newItemNameTrimmed + ' doesnt exist, ok to add')

                    const newItem = await itemCollection.create(item => {
                        item.item_name = newItemNameTrimmed
                    }).catch(console.error)
                    setCount(count + 1)
                }
            })
        }

    }



    return (
        <View>
            <Text>Test Loadup</Text>
            <Text>{count}</Text>
            <Button
                onPress={testAddItem}
                title="test add more items"
            />
            <Button
                onPress={testAddStore}
                title="test add more stores"
            />
            <Button
                onPress={()=>{navigation.navigate('StoreScreen')}}
                title="Show stores"
            />
            


            <View>
                <TextInput
                    onChangeText={setNewItemName}
                    value={newItemName}
                />
                <Button
                    title='Add Item'
                    onPress={handleAddItem}
                />
            </View>


            <ItemsBox database={database} count={count} />
        </View>
    );
}

export default HomeScreen;