import { Alert, Modal, Pressable, Text, TextInput, View } from "react-native"
import { dynamicBgColour, modalStyles, pickerStyles, positionStyles } from "./styles/Styles"
import { useContext, useState } from "react";
import { DbContext } from "../App";
import { PickerColours, lineColours } from "../utilities";
import { Picker, PickerItem } from "react-native-woodpicker";
import { Collection, Q } from "@nozbe/watermelondb";
import Store from "../model/Store";



function StoreForm(props: {
    isVisible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    count: number,
    setCount: React.Dispatch<React.SetStateAction<number>>
}) {

    const { isVisible, setVisible, count, setCount } = props
    const [newStoreName, setNewStoreName] = useState('');




    const [selectedColour, setSelectedColour] = useState<PickerItem>(PickerColours[0])


    const database = useContext(DbContext)


    async function handleAddStore() {
        console.log('handleaddstore')
        console.log(newStoreName)

        const newStoreNameTrimmed = newStoreName.trim()

        if (newStoreNameTrimmed.length == 0) {
            console.log('store name length shouldnt be zero')
            Alert.alert('Invalid store name', 'Store name cannot be blank.', [
                {
                    text: 'Ok',
                }
            ])
        }
        else {
            await database.write(async () => {
                const storeCollection: Collection<Store> = database.collections.get('stores')
                const n_existingStores = await storeCollection.query(
                    Q.where('store_name', newStoreNameTrimmed)
                ).fetchCount()

                if (n_existingStores != 0) {
                    console.log('this name already exists')
                    Alert.alert('Invalid store name', `A store with the name "${newStoreNameTrimmed}" already exists.`, [
                        {
                            text: 'Ok',
                        }
                    ])
                }
                else {
                    console.log(newStoreNameTrimmed + ' doesnt exist, ok to add')

                    console.log(selectedColour)

                    const newStore = await storeCollection.create(store => {
                        store.store_name = newStoreNameTrimmed
                        store.colour = selectedColour.value
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

                    <Text style={modalStyles.modalText}>Add new store</Text>

                    <TextInput
                        style={modalStyles.modalTextInput}
                        onChangeText={setNewStoreName}
                        value={newStoreName}
                        placeholder="Store name"
                    />

                    <View style={[positionStyles.horizontalContainer, modalStyles.modalHorizontalContainer]}>

                        <Text style={modalStyles.modalLabel}>Colour:</Text>


                        <Picker
                            style={[dynamicBgColour(selectedColour.value).dynamicBgColour, pickerStyles.colourPicker]}
                            item={selectedColour}
                            items={PickerColours}
                            onItemChange={setSelectedColour}
                            isNullable={false}
                            mode="dropdown"
                        />
                    </View>


                    <View style={[positionStyles.horizontalContainer, modalStyles.modalHorizontalContainer]}>
                        <Pressable
                            style={[modalStyles.button, modalStyles.buttonClose]}
                        onPress={handleAddStore}
                        >
                            <Text style={modalStyles.textStyle}>Add Store</Text>
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

export default StoreForm