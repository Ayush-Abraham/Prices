/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    useColorScheme,
    View,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


import { NavigationContainer } from '@react-navigation/native';
import { createContext } from 'react';



import { Collection, Database, Q } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';


import schema from './model/schema';
import migrations from './model/migrations';
import Item from './model/Item';
import Store from './model/Store';
import Price from './model/Price';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import {RootStackParamList} from './StackParamList';
import ItemDetail from './components/ItemDetail';


// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
    schema,
    // (You might want to comment it out for development purposes -- see Migrations documentation)
    migrations,
    // (optional database name or file system path)
    // dbName: 'myapp',
    // (recommended option, should work flawlessly out of the box on iOS. On Android,
    // additional installation steps have to be taken - disable if you run into issues...)
    jsi: false, /* Platform.OS === 'ios' */
    // (optional, but you should implement this method)
    onSetUpError: error => {
        // Database failed to load -- offer the user to reload the app or log out
    }
})

// Then, make a Watermelon database from it!
const database = new Database({
    adapter,
    modelClasses: [
        Item,
        Store,
        Price,
    ],
})

export const DbContext = createContext(database)



const Stack = createNativeStackNavigator<RootStackParamList>();




function App(): React.JSX.Element {

    const [count, setCount] = useState(0);
    const [newItemName, setNewItemName] = useState('');


    async function testAddItem() {
        await database.write(async () => {
            const itemCollection: Collection<Item> = database.collections.get('items')
            const newItem = await itemCollection.create(item => {
                item.item_name = 'testItem_Name__' + String(count)
            }).catch(console.error)
            console.log('inside testadditem')
            setCount(count + 1)
        })

    }

    async function handleAddItem() {
        console.log('handleadditem')
        console.log(newItemName)

        const newItemNameTrimmed = newItemName.trim()

        if (newItemNameTrimmed.length == 0) {
            console.log('item name length shouldnt be zero')
        }
        else {
            await database.write(async () => {
                const itemCollection: Collection<Item> = database.collections.get('items')
                const n_existingItems = await itemCollection.query(
                    Q.where('item_name', newItemNameTrimmed)
                ).fetchCount()

                if (n_existingItems != 0) {
                    console.log('this name already exists')
                }
                else {
                    console.log(newItemNameTrimmed + ' doesnt exist, ok to add')

                    const newItem = await itemCollection.create(item => {
                        item.item_name = newItemNameTrimmed
                    }).catch(console.error)
                    setCount(count + 1)
                }
            })
        }

    }



    return (
        <NavigationContainer>
            <Stack.Navigator>         
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                />
                <Stack.Screen
                    name='ItemDetail'
                    component={ItemDetail}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}



// const TestComponent= ({count}:{count:number}) => {
//     return(
//         <View>
//             <Text>Test Component</Text>
//             <Text>{count}</Text>
//         </View>
//     );
// }






// type SectionProps = PropsWithChildren<{
//     title: string;
// }>;

// function Section({ children, title }: SectionProps): React.JSX.Element {
//     const isDarkMode = useColorScheme() === 'dark';
//     return (
//         <View style={styles.sectionContainer}>
//             <Text
//                 style={[
//                     styles.sectionTitle,
//                     {
//                         color: isDarkMode ? Colors.white : Colors.black,
//                     },
//                 ]}>
//                 {title}
//             </Text>
//             <Text
//                 style={[
//                     styles.sectionDescription,
//                     {
//                         color: isDarkMode ? Colors.light : Colors.dark,
//                     },
//                 ]}>
//                 {children}
//             </Text>
//         </View>
//     );
// }

// function App(): React.JSX.Element {
//     const isDarkMode = useColorScheme() === 'dark';

//     const backgroundStyle = {
//         backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//     };

//     return (
//         <SafeAreaView style={backgroundStyle}>
//             <StatusBar
//                 barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//                 backgroundColor={backgroundStyle.backgroundColor}
//             />
//             <ScrollView
//                 contentInsetAdjustmentBehavior="automatic"
//                 style={backgroundStyle}>
//                 <Header />
//                 <View
//                     style={{
//                         backgroundColor: isDarkMode ? Colors.black : Colors.white,
//                     }}>
//                     <Section title="Step One">
//                         Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//                         screen and then come back to see your edits.
//                     </Section>
//                     <Section title="See Your Changes">
//                         <ReloadInstructions />
//                     </Section>
//                     <Section title="Debug">
//                         <DebugInstructions />
//                     </Section>
//                     <Section title="Learn More">
//                         Read the docs to discover what to do next:
//                     </Section>
//                     <LearnMoreLinks />
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     sectionContainer: {
//         marginTop: 32,
//         paddingHorizontal: 24,
//     },
//     sectionTitle: {
//         fontSize: 24,
//         fontWeight: '600',
//     },
//     sectionDescription: {
//         marginTop: 8,
//         fontSize: 18,
//         fontWeight: '400',
//     },
//     highlight: {
//         fontWeight: '700',
//     },
// });

export default App;
