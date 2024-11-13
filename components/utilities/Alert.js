import { Alert } from "react-native";


function notification(title, messagge, buttonText) {
    return () => {
        if(messagge) {    
            Alert.alert(title, messagge, [
                {
                    text: buttonText || 'Ok',
                    onPress: () => null,
                    style: 'Ok',
                },
            ]);
        }
    };
}

export default notification;