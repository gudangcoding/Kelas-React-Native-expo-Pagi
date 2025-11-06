import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import colors from '../app/constants/colors';

interface CircleAvatarProps {
    source: ImageSourcePropType;
    size?: number;
    backgroundColor?: string;
}

const CircleAvatar: React.FC<CircleAvatarProps> = ({
    source,
    size = 100,
    backgroundColor = colors.surface
}) => {
    return (
        <View style={[
            styles.container,
            {
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor
            }
        ]}>
            <Image
                source={source}
                style={{
                    width: size * 0.7,
                    height: size * 0.7,
                    resizeMode: 'contain'
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    }
});

export default CircleAvatar;