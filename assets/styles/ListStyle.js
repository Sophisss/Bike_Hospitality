import { Dimensions, StyleSheet } from "react-native";

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
    color: '#294075',
    fontSize: contentTextSize + 6,
    fontWeight: 'bold',
  },

  itemCard: {
    backgroundColor: "#2F84C4",
    flexDirection: 'row',
    marginBottom: contentMargins + 8,
    marginRight: contentMargins + 4,
    marginTop: contentMargins,
    maxWidth: width,
  },

  itemCardVertical: {
    alignContent: 'center',
    backgroundColor: "#2F84C4",
    flexDirection: 'row',
    margin: 10,
    borderRadius: 15
  },

  itemCardComuni: {
    alignItems: 'center',
    maxWidth: windowWidth * 0.5,
  },

  itemCardLeftImage: {
    backgroundColor: "#2F84C4",
    marginBottom: contentMargins + 8,
    padding: 10,
    borderRadius: 15,
  },

  itemImage: {
    width: width,
    aspectRatio: 1.5,
    resizeMode: 'contain',
  },

  itemImageVertical: {
    width: '100%',
    aspectRatio: 1.5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
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
    resizeMode: 'stretch',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
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
    color: '#F0F0F0',
    fontSize: contentTextSize + 2,
    fontWeight: 'bold',
    textAlign: 'left',
  },

  textContainer: {
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    marginBottom: 20,
    gap: 8,
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