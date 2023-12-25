import { Alert, Modal, Pressable, Text, TextInput, View } from "react-native"
import { modalStyles, positionStyles } from "./styles/Styles"
import { useContext, useEffect, useState } from "react";
import { DbContext } from "../App";
import { Collection, Q } from "@nozbe/watermelondb";
import Item from "../model/Item";



function ItemForm(props: {
    isVisible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    count: number,
    setCount: React.Dispatch<React.SetStateAction<number>>
}) {
    const { isVisible, setVisible, count, setCount } = props

    const [newItemName, setNewItemName] = useState('');

    const database = useContext(DbContext)

    useEffect(() => {
        setNewItemName('')
    }, [isVisible])


    async function handleAddItem() {
        console.log('handleadditem')
        console.log(newItemName)

        const newItemNameTrimmed = newItemName.trim()

        if (newItemNameTrimmed.length == 0) {
            console.log('item name length shouldnt be zero')
            Alert.alert('Invalid item name', 'Item name cannot be blank.', [
                {
                    text: 'Ok',
                }
            ])
        }
        else {
            await database.write(async () => {
                const itemCollection: Collection<Item> = database.collections.get('items')
                const n_existingItems = await itemCollection.query(
                    Q.where('item_name', newItemNameTrimmed)
                ).fetchCount()

                if (n_existingItems != 0) {
                    console.log('this name already exists')
                    Alert.alert('Invalid item name', `An item with the name "${newItemNameTrimmed}" already exists.`, [
                        {
                            text: 'Ok',
                        }
                    ])
                }
                else {
                    console.log(newItemNameTrimmed + ' doesnt exist, ok to add')

                    const newItem = await itemCollection.create(item => {
                        item.item_name = newItemNameTrimmed
                    }).catch(console.error)
                    setCount(count+1)
                    setVisible(false)
                }
            })
        }
    }



    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
        >
            <View style={modalStyles.centeredView}>
                <View style={modalStyles.modalView}>

                    <Text style={modalStyles.modalText}>Add new item</Text>

                    <TextInput
                        style={[modalStyles.modalTextInput, modalStyles.modalHorizontalContainer]}
                        onChangeText={setNewItemName}
                        value={newItemName}
                        placeholder="Item name"
                    />

                    <View style={[modalStyles.modalHorizontalContainer, positionStyles.horizontalContainer]}>
                        <Pressable
                            style={[modalStyles.button, modalStyles.buttonClose]}
                            onPress={handleAddItem}
                        >
                            <Text style={modalStyles.textStyle}>Add Item</Text>
                        </Pressable>
                        <Pressable
                            style={[modalStyles.button, modalStyles.buttonClose]}
                            onPress={() => setVisible(false)}
                        >
                            <Text style={modalStyles.textStyle}>Cancel</Text>
                        </Pressable>
                    </View>



                </View>
            </View>
        </Modal>
    )

}

export default ItemForm