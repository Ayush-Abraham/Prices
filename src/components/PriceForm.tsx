import { useState } from "react";
import { Button, TextInput, View } from "react-native"



function PriceForm() {

    const [store, setStore] = useState('');
    const [price, setPrice] = useState('0');


    return (
        <View>
            <TextInput
                onChangeText={setPrice}
                value={price}
            />
            <Button
                title='Add Price'
            />
        </View>
    )
}

export default PriceForm