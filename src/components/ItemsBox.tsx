import { useState, useEffect } from "react";
import { FlatList } from "react-native";
import SingleItem from "./SingleItem";
import { Collection, Database, Model } from '@nozbe/watermelondb';
import Item from "../model/Item";


interface ListComponentProps {
    database: Database
}


const ItemsBox: React.FC<ListComponentProps> = ({database}) => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        async function fetchAllItems() {
            const itemsCollection: Collection<Item> = database.collections.get('items')
            const allItems: Item[] = await itemsCollection.query().fetch()//.catch(()=> {console.log('FAILED TO FETCH 1')});
            setItems(allItems);
        }

        fetchAllItems().catch(()=> {console.error})

    }, [database])

    return(
        <FlatList
            data = {items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => <SingleItem item ={item}/>}
        />
    );

    
}

export default ItemsBox