import { StyleSheet, Dimensions } from 'react-native';

const headerBorderRadius = 15-15;
const windowWidth = Dimensions.get('window').width;
var size = windowWidth>320 ? 25 : 16;
//size = 25;

const headerStyle = StyleSheet.create({
  // Card Style
  cardStyle: {
    backgroundColor: '#BDFFFF',
  },

  // Header Styles
  headerStyle: {
    backgroundColor: '#1E74B7',
    borderBottomLeftRadius: headerBorderRadius,
    borderBottomRightRadius: headerBorderRadius,

  },

  // Header Icon Styles
  headerIconStyle: {
    alignItems:'center',
    backgroundColor: 'rgba(40, 63, 151, 1)',
    borderRadius: 20,
    justifyContent:'center',
    marginHorizontal: 5,
    paddingHorizontal: 10,
  },

  // Header Text Styles
  headerTitleStyle: {
    fontSize: size,
    fontWeight: 'bold',
  },

  // Header Icon Size
  headerIconSize: size,
  
  // Header Icon Color
  headerIconColor: 'yellow',

  // Header Text Color
  headerTintColor: 'white',

  // Header Text Alignment
  headerTitleAlign: 'center',

  // Image Styles
  imageStyle: {
    marginHorizontal: 20,
    resizeMode: 'contain',
    width: windowWidth * 0.09, // 10% of the screen width
    height: windowWidth * 0.09,
  },
});

export default headerStyle;
