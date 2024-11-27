import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';

const screenHeight = Dimensions.get('window').height;


const homeStyle = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'royalblue',
    flexGrow: 1,
  },

  imageBackground: {
    height: '100%',
    opacity: 0.7,
    resizeMode: 'cover'
  },

  box: {
    position: 'absolute',
    zIndex: 2,
    width: '100%',
    height: '100%',
    gap: 20,
    padding: 10
  },

  header: {
    // flex: 1,
    height: null,
    resizeMode: 'contain',
    width: null,
  },

  logoBH: {
    alignSelf: 'center',
    resizeMode: "contain",
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').height / 6,
    aspectRatio: 1,
    marginTop: 10,
    marginBottom: 10,
  },

  svg: {
    width: '100%',
    height: 'auto'
  },

  logoSingleButton: {
    aspectRatio: 4,
    flex: 1,
    height: undefined, // Clear fixed height
    width: undefined, // Clear fixed width
  },

  body: {
    justifyContent: 'center',
    maxHeight: screenHeight > 680 ? Dimensions.get('window').height : Dimensions.get('window').height * 0.48
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
    color: 'white',
    //fontSize: 14,
    fontSize: screenHeight > 680 ? 14 : 12,
    fontWeight: 'bold', // Bold font
    textAlign: 'center', // Center text within the button
  },

  scrollview: {
    padding: 2
  }
})



export default homeStyle;