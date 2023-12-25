import { useContext, useState } from "react";
import Price from "../model/Price";
import { DbContext } from "../App";
import { Alert, Button, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { Collection, Q } from "@nozbe/watermelondb";



function SinglePrice(props: { price: Price; store_name: string, store_colour: string }): React.JSX.Element {

    const { price, store_colour, store_name } = props;

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const database = useContext(DbContext)

    async function handleDeletePrice() {

        Alert.alert('Are you sure?', '', [
            {
                text: 'Delete observation',
                onPress: deletePrice
            },
            {
                text: 'Cancel',
            }
        ])
    }

    async function deletePrice() {

        await database.write(async () => {
            const pricesCollection: Collection<Price> = database.collections.get('prices')
            const foundPrices: Price[] = await pricesCollection.query(
                Q.where('id', price.id)
            ).fetch()
            await foundPrices[0].destroyPermanently().catch(console.error)

            navigation.goBack()
        })
    }


    return (
        <View>
            <Text>{price.cost}</Text>
            <Text>{price.noted_at}</Text>
            <Text>{store_name}</Text>
            <Button
                title={'Delete'}
                onPress={handleDeletePrice}
            />
        </View>
    );
}

export default SinglePrice;