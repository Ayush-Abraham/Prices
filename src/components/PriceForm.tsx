import { useContext, useEffect, useState } from "react";
import { Alert, Button, ScrollView, TextInput, View } from "react-native"
import { DbContext } from "../App";
import { Collection, Q } from "@nozbe/watermelondb";
import Store from "../model/Store";
import type { PickerItem } from 'react-native-woodpicker'
import { Picker, DatePicker } from 'react-native-woodpicker'
import Price from "../model/Price";


function PriceForm(props: { item_id: string }) {

    const { item_id } = props;

    const defaultStore = { label: 'Select a store', value: null }
    const defaultDate: Date = new Date

    const [selectedStore, setSelectedStore] = useState<PickerItem>(defaultStore);
    const [storePickerItems, setStorePickerItems] = useState<PickerItem[]>([defaultStore]);

    const [selectedDate, setSelectedDate] = useState<Date>(defaultDate);
    const [price, setPrice] = useState('0');

    const database = useContext(DbContext)


    useEffect(() => {
        async function fetchStores() {
            const storesCollection: Collection<Store> = database.collections.get('stores')
            const allStores: Store[] = await storesCollection.query().fetch()//.catch(()=> {console.log('FAILED TO FETCH 1')});

            const pickerStores: PickerItem[] = []

            for (let i = 0; i < allStores.length; i++) {
                pickerStores.push({ label: allStores[i].store_name, value: allStores[i] })
            }

            setStorePickerItems(pickerStores);
        }

        fetchStores().catch(() => { console.error })
    }, [])


    function handleSetDate(newDate: Date | null) {

        console.log('handle set data')
        console.log(newDate)

        if (newDate != null) {
            setSelectedDate(newDate)
        }
    }

    async function handleAddObservation() {

        const parsedPrice = Number(price)
        if (parsedPrice <= 0) {
            Alert.alert('Price cannot be zero or negative', 'Was it free? Or are they paying you to take this? If the latter, you should probably not.', [
                {
                    text: 'Ok',
                }
            ])
        }
        else {

            if (selectedStore.value == null) {
                Alert.alert('Please select a store', '', [
                    {
                        text: 'Ok',
                    }
                ])
            }

            else {

                const stringDate = selectedDate.toDateString()
                const store_id = selectedStore.value.id

                console.log(parsedPrice)
                console.log(selectedStore)
                console.log(stringDate)

                await database.write(async () => {
                    const pricesCollection: Collection<Price> = database.collections.get('prices')

                    const n_existingPrices = await pricesCollection.query(
                        Q.where('item_id', item_id),
                        Q.where('store_id', store_id),
                        Q.where('noted_at', stringDate),
                    ).fetchCount()

                    if (n_existingPrices != 0) {
                        Alert.alert('Cannot duplicate observation', 'An observation at this store and date already exists', [
                            {
                                text: 'Ok',
                            }
                        ])
                    }
                    else {
                        const newPrice = await pricesCollection.create(price => {
                            price.item_id = item_id
                            price.store_id = store_id
                            price.cost = parsedPrice
                            price.noted_at = stringDate
                        }).catch(console.error)
                        console.log('added price')
                    }
                })
            }
        }
    }




    return (
        <View style={{
            flexGrow: 1,
            backgroundColor: 'beige',
            borderWidth: 2,
            padding: 10
        }}>
            {/* <View> */}

            {/* <ScrollView> */}
            <Button
                title='Add price observation'
                onPress={handleAddObservation}
            />
            <TextInput
                onChangeText={setPrice}
                value={price}
            />
            <View style={{
                flex: 0.4,
                borderWidth: 0.5,
                padding: 10
            }}>

                <Picker
                    item={selectedStore}
                    items={storePickerItems}
                    onItemChange={setSelectedStore}
                    placeholder="Select store"
                    isNullable={false}
                    mode="dropdown"
                />
            </View>
            <View style={{
                flex: 0,
                // flexGrow: 0.,
                borderWidth: 0.5,
                padding: 10

            }}>
                <DatePicker
                    value={selectedDate}
                    onDateChange={(value) => handleSetDate(value)}
                    // onDateChange={setSelectedDate}
                    title='Select date of observation'
                    text={selectedDate.toDateString()}
                    // text={'asdf'}
                    isNullable={false}

                />

            </View>





            {/* </ScrollView> */}
        </View>
    )
}

export default PriceForm