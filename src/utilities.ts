import type { PickerItem } from 'react-native-woodpicker'


export const lineColours = [
    "black",
    "blue",
    "red",
    "yellow",
    'orange',
    "green",
    "purple",
    'pink',
    'gray',
    'brown',
    "silver",
    "lime",
    "olive",
    "navy",
    "maroon",
    "teal",
    "aqua"
]

export const PickerColours: PickerItem[] = lineColours.map((col) => (
    {
        value: col,
        label: col,
        color: col
    }
))