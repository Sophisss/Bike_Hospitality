import { Dimensions, Platform, StyleSheet } from "react-native";

const contentTextSize = 20;
const contentMargins = 12;
const windowWidth = Dimensions.get("window").width;
const width = windowWidth * 0.7;


const listStyle = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#BDFFFF',
    display: 'flex',
    marginBottom: 10,
    paddingBottom: 15
  },
  mainContainerLeftImage: {
    backgroundColor: '#BDFFFF',
    display: 'flex',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  categoryContainer: {
    marginTop: contentMargins + 8,
  },

  categoryText: {
    color: '#1E74B7',
    fontSize: contentTextSize + 6,
    fontWeight: 'bold',
  },

  itemCard: {
    backgroundColor: "#3399ff",
    flexDirection: 'row',
    marginBottom: contentMargins + 8,
    marginRight: contentMargins + 4,
    marginTop: contentMargins,
    maxWidth: width,
    overflow: 'hidden'
  },
  itemCardVertical: {
    alignContent: 'center',
    backgroundColor: "#3399ff",
    flexDirection: 'row',
    margin: 10,
    overflow: 'hidden'
  },
  itemCardComuni: {
    maxWidth: windowWidth * 0.5,
  },
  itemCardLeftImage: {
    backgroundColor: "#3399ff",
    marginBottom: contentMargins + 8,
    padding: 10,
  },

  itemImage: {
    width: width,
    aspectRatio: 1.5,
    resizeMode: 'stretch'
  },
  itemImageVertical: {
    width: '100%',
    //height: 'auto',
    aspectRatio: 1.5,
    resizeMode: 'stretch',
  },
  collabItemImage: {
    alignSelf: 'center',
    width: windowWidth * 0.7,
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'stretch'
  },
  comuniItemImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.5,
    //  flex: 1,
    resizeMode: 'contain',
  },
  eventItemImage: {
    alignSelf: 'center',
    width: windowWidth * 0.9,
    height: undefined,
    aspectRatio: 0.85,
    resizeMode: 'stretch'
  },
  itemLeftImage: {
    borderRadius: 15,
    height: 100,
    resizeMode: 'cover',
    width: 100,
  },

  infoContainer: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flex: 1,
    padding: 10,
  },
  infoCollabContainer: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flex: 1,
    paddingBottom: 2
  },
  infoContainerLeftImage: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  accName: {
    color: 'yellow',
    fontSize: contentTextSize + 2,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  textContainer: {
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    marginBottom: 20,
  },
  textContainerLeftImage: {
    borderRadius: 10,
    flexDirection: 'row',
    marginBottom: contentMargins,
  },
  text: {
    flex: 1,
    textAlign: 'left',
    flexWrap: 'wrap',
    fontSize: contentTextSize - 3,
  },
  textItalic: {
    fontStyle: 'italic',
    fontWeight: 'bold',
  },


})


export default listStyle;