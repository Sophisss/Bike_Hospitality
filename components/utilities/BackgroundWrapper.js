import React from 'react';
import { View, ImageBackground } from 'react-native';

const BackgroundWrapper = ({ dataLength, children, styles }) => {

    const backgroundColor = dataLength === 0 || dataLength === undefined ? 'royalblue' : '#ADD8E6';

    return (
        <View style={[styles.mainContainer, { backgroundColor: backgroundColor }]}>
            {dataLength === 0 || dataLength === undefined ? (
                <ImageBackground
                    source={require('../../assets/images/background.png')}
                    style={styles.imageBackground}
                />
            ) : null}
            {children}
        </View>
    );
};

export default BackgroundWrapper;
