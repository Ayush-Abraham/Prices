import { Database } from "@nozbe/watermelondb"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import type { RouteProp } from '@react-navigation/native';
import Item from "./model/Item";

export type RootStackParamList = {
    HomeScreen: undefined;
    ItemDetail: {item_id: string}
}

export type HomeScreenNavigationProp = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>
export type ItemDetailNavigationProp = NativeStackScreenProps<RootStackParamList, 'ItemDetail'>

export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'HomeScreen'>
export type ItemDetailRouteProp = RouteProp<RootStackParamList, 'ItemDetail'>
