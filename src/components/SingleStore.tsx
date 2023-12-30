import { Alert, Button, Text, View } from "react-native";
import Store from "../model/Store";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../types";
import { useContext, useState } from "react";
import { DbContext } from "../App";
import { Collection, Q } from "@nozbe/watermelondb";
import Price from "../model/Price";
import { dynamicBgColour, pickerStyles, positionStyles, singleViewStyles } from "./styles/Styles";
import { Picker, PickerItem } from "react-native-woodpicker";
import { PickerColours } from "../utilities";



function SingleStore(props: { store: Store; }): React.JSX.Element {

    const { store } = props;

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [selectedColour, setSelectedColour] = useState<PickerItem>(PickerColours.find((x) => x.value == store.colour) ?? { value: 'red', label: 'red' })

    const database = useContext(DbContext)

    async function handleDeleteStore() {

        Alert.alert('Are you sure?', 'Deleting this store will also delete all its pricing info', [
            {
                text: 'Delete',
                onPress: deleteStore
            },
            {
                text: 'Cancel',
            }
        ])
    }

    async function deleteStore() {

        await database.write(async () => {
            const storesCollection: Collection<Store> = database.collections.get('stores')
            // const foundStores: Store[] = await storesCollection.query(
            //     Q.where('id', store.id)
            // ).fetch()
            // await foundStores[0].destroyPermanently().catch(console.error)

            const foundStore = await storesCollection.find(store.id)

            const pricesCollection: Collection<Price> = database.collections.get('prices')
            const foundPrices: Price[] = await pricesCollection.query(
                Q.where('store_id', store.id)
            ).fetch()

            for (let i = 0; i < foundPrices.length; i++) {
                await foundPrices[i].destroyPermanently().catch(console.error)
            }

            // navigation.goBack()
        })
    }

    async function handleChangeColour(newColourItem: PickerItem) {
        console.log(newColourItem.value)
        setSelectedColour(newColourItem)

        await database.write(async () => {
            const storesCollection: Collection<Store> = database.collections.get('stores')
            const foundStores: Store[] = await storesCollection.query(
                Q.where('id', store.id)
            ).fetch()

            const foundStore = await storesCollection.find(store.id)

            await foundStore.update(() => {
                foundStore.colour = newColourItem.value
            })

        })






    }


    return (
        <View style={[positionStyles.horizontalContainer, singleViewStyles.viewingCard]}>
            <View style={positionStyles.horizontalContainer}>
                <Text>{store.store_name}</Text>
                <Picker
                    style={[dynamicBgColour(store.colour).dynamicBgColour, pickerStyles.colourPicker]}
                    item={selectedColour}
                    items={PickerColours}
                    onItemChange={(col) => (handleChangeColour(col))}
                    isNullable={false}
                    mode="dropdown"
                />
            </View>
            <View>
                <Button
                    title={'Delete'}
                    onPress={handleDeleteStore}
                />
            </View>
        </View>
    );
}

export default SingleStore;