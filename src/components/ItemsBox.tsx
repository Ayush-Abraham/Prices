import { useState, useEffect } from "react";
import { FlatList } from "react-native";
import SingleItem from "./SingleItem";
import { Collection, Database, Model } from '@nozbe/watermelondb';
import Item from "../model/Item";
import { useIsFocused } from '@react-navigation/native';



interface ListComponentProps {
    database: Database,
    count: number,
}


const ItemsBox: React.FC<ListComponentProps> = ({database, count}) => {
    const [items, setItems] = useState<Item[]>([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        async function fetchAllItems() {
            const itemsCollection: Collection<Item> = database.collections.get('items')
            const allItems: Item[] = await itemsCollection.query().fetch()//.catch(()=> {console.log('FAILED TO FETCH 1')});
            setItems(allItems);
        }

        fetchAllItems().catch(()=> {console.error})

    }, [count, isFocused])

    return(
        <FlatList
            data = {items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <SingleItem item ={item}/>}
        />
    );

    
}

export default ItemsBox