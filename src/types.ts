import type { RouteProp } from '@react-navigation/native';
import Price from './model/Price';

export type RootStackParamList = {
    HomeScreen: undefined;
    ItemDetail: { item_id: string }
    StoreScreen: undefined
}

// export type HomeScreenNavigationProp = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>
// export type ItemDetailNavigationProp = NativeStackScreenProps<RootStackParamList, 'ItemDetail'>

// export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'HomeScreen'>
export type ItemDetailRouteProp = RouteProp<RootStackParamList, 'ItemDetail'>


export type StoreMap = {
    [key: string]: { // store id
        store_name: string,
        store_colour: string
    }
}

export type PriceDetail = {

    prices: Price[],
    storeMap: StoreMap

}