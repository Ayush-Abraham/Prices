import { useContext, useState } from "react";
import Price from "../model/Price";
import { DbContext } from "../App";
import { Alert, Button, Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { Collection, Q } from "@nozbe/watermelondb";
import { positionStyles, singleViewStyles } from "./styles/Styles";



function SinglePrice(props: { price: Price; store_name: string, store_colour: string, itemDetailsRefresh: () => void }): React.JSX.Element {

    const { price, store_colour, store_name, itemDetailsRefresh } = props;

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const database = useContext(DbContext)

    function handleDeletePrice() {

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

            // navigation.goBack()

        })
        itemDetailsRefresh()
    }


    return (
        <View style={[positionStyles.horizontalContainer, singleViewStyles.viewingCard]}>
            <View style={positionStyles.horizontalContainer}>
                <View>
                    <Text style={singleViewStyles.titleText}>Date </Text>
                    <Text style={singleViewStyles.titleText}>Price </Text>
                    <Text style={singleViewStyles.titleText}>Store </Text>
                </View>
                <View>
                    <Text>{price.noted_at}</Text>
                    <Text>{price.cost}</Text>
                    <Text>{store_name}</Text>
                </View>
            </View>
            {/* <View>
                <Button
                    title={'Delete'}
                    onPress={handleDeletePrice}
                />
            </View> */}
            <Pressable
                style={singleViewStyles.deleteButton}
                onPress={handleDeletePrice}
            >
                <Text style={singleViewStyles.buttonText}>Delete</Text>
            </Pressable>
        </View>
    );
}

export default SinglePrice;