import { StyleSheet } from "react-native";

export const pickerStyles = StyleSheet.create({
    datePicker: {
        backgroundColor: '#F5F5ED',
        padding: 10,
        margin: 10,
        paddingHorizontal: 20,
        maxHeight: 45,
        borderRadius: 10,
        justifyContent: 'flex-start'
    },
    storePicker: {
        backgroundColor: '#F5F5ED',
        padding: 10,
        margin: 10,
        paddingHorizontal: 20,
        maxHeight: 45,
        borderRadius: 10,
        justifyContent: 'flex-start'
    },
    colourPicker: {
        padding: 10,
        margin: 10,
        paddingHorizontal: 20,
        maxHeight: 45,
        width: 100,
        borderRadius: 10,
        justifyContent: 'flex-start'
    }
})

export function dynamicBgColour(colour: string) {
    return StyleSheet.create({
        dynamicBgColour: {
            backgroundColor: colour,
        }
    })
}

export const singleViewStyles = StyleSheet.create({
    colourBox: {
        width: 10,
        height: 10
    }
})

export const positionStyles = StyleSheet.create({
    horizontalContainer: {
        flexDirection: 'row',
    }    
})


export const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        paddingHorizontal: 17
    },
    buttonOpen: {
        backgroundColor: 'green',
        margin: 10
    },
    buttonClose: {
        backgroundColor: '#2196F3',
        marginHorizontal: 10
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 30,
    },
    modalLabel: {
        paddingTop: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 17,
    },
    modalTextInput: {
        backgroundColor: '#F5F5ED',
        borderRadius: 20,
        padding: 10,
        minWidth: 200
    },
    modalHorizontalContainer: {
        justifyContent: 'space-around',
        marginVertical: 10
    },
});
