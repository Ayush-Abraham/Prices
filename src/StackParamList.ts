import type { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
    HomeScreen: undefined;
    ItemDetail: {item_id: string}
    StoreScreen: undefined
}

// export type HomeScreenNavigationProp = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>
// export type ItemDetailNavigationProp = NativeStackScreenProps<RootStackParamList, 'ItemDetail'>

// export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'HomeScreen'>
export type ItemDetailRouteProp = RouteProp<RootStackParamList, 'ItemDetail'>
