import { StyleSheet, Dimensions } from 'react-native';

const sectionMarginHorizontal = 0;
const sectionPadding = 20;

const detailStyle = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    backgroundColor: '#BDFFFF',
    flexGrow: 1,
  },
  mainContainerLeftPhoto: {
    alignItems: 'center',
    backgroundColor: 'azure',
    flexGrow: 1,
  },
  mainContentView: {
    alignSelf: 'stretch',
    backgroundColor: 'skyblue',
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 15,
    padding: 10,
    gap: 10,
  },
  mainContentDetailsView: {
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },


  detailTitle: {
    color: '#294075',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: "center",
    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
    // textShadowOffset: { width: -1, height: 1 },
    // textShadowRadius: 10,
  },


  button: {
    alignItems: 'center',
    backgroundColor: 'mediumblue',
    borderRadius: 10,
    flexDirection: 'row',
    padding: 10,
  },
  smallButton: {
    backgroundColor: '#4da6ff',
    borderRadius: 10,
    marginRight: 5,
    padding: 3,
  },
  buttonFlex: {
    alignSelf: 'center',
    flex: 1,
    flexBasis: '40%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center'
  },
  buttonTextFlex: {
    flex: 1,
  },
  hLine: {
    alignSelf: 'stretch',
    backgroundColor: 'black',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 2,
    marginVertical: 15
  },


  photo: {
    alignSelf: 'center',
    aspectRatio: 1.5,
    borderRadius: 10,
    height: undefined,
    marginHorizontal: 10,
    marginVertical: 7,
    resizeMode: "stretch",
    width: Dimensions.get('window').width - ((Dimensions.get('window').width * 35) / 90),
  },
  collPhoto: {
    aspectRatio: 2,
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  eventPhoto: {
    aspectRatio: 0.7,
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  guidePhoto: {
    alignSelf: 'center',
    borderRadius: 30,
    height: Dimensions.get('window').height / 4.5,
    marginBottom: 10,
    resizeMode: "contain",
    width: Dimensions.get('window').width / 2,
  },
  comunePhoto: {
    width: '100%',
    height: undefined,
    aspectRatio: 2,
    //  flex: 1,
    resizeMode: 'contain',
  },

  sectionView: {
    alignSelf: 'stretch',
    backgroundColor: '#b3d9ff',
    marginVertical: 5,
    padding: sectionPadding - 5
  },

  sectionTitle: {
    color: "#294196",
    flex: 5,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },

  sectionIcon: {
    alignItems: 'flex-end',
    alignSelf: 'flex-start',
    flex: 0.5
  },

  sectionBody: {
    fontSize: 17,
  },

  map: {
    alignSelf: 'center',
    height: Dimensions.get('window').height / 3,
    marginTop: 10,
    width: Dimensions.get('window').width - (sectionMarginHorizontal * 2) - (sectionPadding * 2),
  },


  flexDirectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default detailStyle;
