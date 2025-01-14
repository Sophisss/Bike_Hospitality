import { StyleSheet } from 'react-native';

const authStyle = StyleSheet.create({

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 18,
        marginTop: 10,
        marginLeft: 10,
        color: '#294075'
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#ccc'
    },

    input: {
        width: '100%',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        fontSize: 18,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#f5f5f5',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        height: 50,
        borderBottomWidth: 0,
    },

    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: [{ translateY: -20 }]
    },

    clearButton: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: [{ translateY: -20 }]
    },

    backButton: {
        position: 'absolute',
        left: 10,
        top: 10,
        zIndex: 1
    },

    authButton: {
        backgroundColor: '#294075',
        padding: 15,
        borderRadius: 20,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10
    },

    authButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },

    secondaryButton: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 20,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10
    },

    secondaryButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#294075'
    }
});

export default authStyle;