import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';


const homeStyle = StyleSheet.create({
    mainContainer: {
      backgroundColor: 'royalblue',
      flexGrow: 1,
    },

    header: {
      flex: 1,
      height: null,
      resizeMode: 'contain',
      width: null,
    },
    logoBH: {
      alignSelf: 'center',
      resizeMode:"contain",
      width: Dimensions.get('window').width / 2,
      height: undefined,
      aspectRatio: 1, 
      marginTop: 10,
      marginBottom: 10,
    },

    logoSingleButton: {
      aspectRatio: 4,
      flex: 1,
      height: undefined, // Clear fixed height
      width: undefined, // Clear fixed width
    },
    
    body: {
      backgroundColor: 'yellow',
      borderRadius: 10,
      margin: 10,
      borderWidth: 3,
      borderColor: '#CD853F',
    },
    touchableRow: {
      flexDirection: 'row',
    },
    touchableRowItem: {
      alignItems: 'center',
      backgroundColor: '#294075',
      borderRadius: 10,
      flex: 1,
      margin: 3,
      padding: 5,
    },
    touchableContentHorizontal: {
      backgroundColor: 'white',
      flexDirection: 'row',
    },
    touchableItemIcon: {
       marginBottom: 10,
    },
    touchableItemText: {
      color: 'white', // Text color
      fontSize: 14,
      fontWeight: 'bold', // Bold font
      textAlign: 'center', // Center text within the button
    },
})




export default homeStyle;