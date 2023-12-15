import { Alert, Button, Text, View } from "react-native";
import Store from "../model/Store";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../StackParamList";
import { useContext } from "react";
import { DbContext } from "../App";
import { Collection, Q } from "@nozbe/watermelondb";
import Price from "../model/Price";



function SingleStore(props: { store: Store; }): React.JSX.Element {

    const { store } = props;

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
            const foundStores: Store[] = await storesCollection.query(
                Q.where('id', store.id)
            ).fetch()
            await foundStores[0].destroyPermanently().catch(console.error)

            const pricesCollection: Collection<Price> = database.collections.get('prices')
            const foundPrices: Price[] = await pricesCollection.query(
                Q.where('store_id', store.id)
            ).fetch()
            
            for (let i=0; i< foundPrices.length; i++) {
                await foundPrices[i].destroyPermanently().catch(console.error)
            }

            // navigation.goBack()
        })    
    }


    return (
        <View>
            <Text>{store.store_name}</Text>
            <Button
                title={'Delete'}
                onPress={handleDeleteStore}
            />
        </View>
    );
}

export default SingleStore;