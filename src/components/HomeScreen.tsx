import { Collection, Database, Q } from "@nozbe/watermelondb";
import { useState } from "react";
import { Button, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Item from "../model/Item";
import ItemsBox from "./ItemsBox";
import { DbContext } from "../App";
import { useContext } from 'react';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Store from "../model/Store";
import { modalStyles } from "./styles/Styles";
import ItemForm from "./ItemForm";





const HomeScreen = () => {

    const database = useContext(DbContext)

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [count, setCount] = useState(0);
    const [showItemForm, setShowItemForm] = useState(false);


    // async function testAddItem() {
    //     await database.write(async () => {
    //         const itemCollection: Collection<Item> = database.collections.get('items')
    //         const newItem = await itemCollection.create(item => {
    //             item.item_name = 'testItem_Name__' + String(count)
    //         }).catch(console.error)
    //         console.log('inside testadditem')
    //         setCount(count + 1)
    //     })
    // }

    // async function testAddStore() {
    //     await database.write(async () => {
    //         const storeCollection: Collection<Store> = database.collections.get('stores')
    //         const newStore = await storeCollection.create(store => {
    //             store.store_name = 'test_store_Name__' + String(count)
    //         }).catch(console.error)
    //         console.log('inside testadd store')
    //     })
    // }

    return (
        <View>
            <Text>Test Loadup</Text>
            <Text>{count}</Text>

            <ItemForm isVisible={showItemForm} setVisible={setShowItemForm} count={count} setCount={setCount} />

            {/* <Button
                onPress={testAddItem}
                title="test add more items"
            /> */}
            {/* <Button
                onPress={testAddStore}
                title="test add more stores"
            /> */}
            <Button
                onPress={() => { navigation.navigate('StoreScreen') }}
                title="Show stores"
            />

            <Pressable
                style={[modalStyles.button, modalStyles.buttonClose]}
                onPress={() => setShowItemForm(true)}
            >
                <Text style={modalStyles.textStyle}>Add Item</Text>
            </Pressable>

            <ItemsBox database={database} count={count} />
        </View>
    );
}




export default HomeScreen;
