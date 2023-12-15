import { useContext, useState } from "react";
import Price from "../model/Price";
import { DbContext } from "../App";
import { Alert, Button, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../StackParamList";
import { Collection, Q } from "@nozbe/watermelondb";



function SinglePrice(props: { priceDetail: Price; }): React.JSX.Element {

    const { priceDetail } = props;

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
                Q.where('id', priceDetail.id)
            ).fetch()
            await foundPrices[0].destroyPermanently().catch(console.error)

            navigation.goBack()
        })
    }


    return (
        <View>
            <Text>{priceDetail.cost}</Text>
            <Text>{priceDetail.noted_at}</Text>
            <Text>{priceDetail.store_id}</Text>
            <Button
                title={'Delete'}
                onPress={handleDeletePrice}
            />
        </View>
    );
}

export default SinglePrice;