import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import colors from '../app/constants/colors';

interface CustomButtonProps extends TouchableOpacityProps {
    title: string;
    backgroundColor?: string;
    textColor?: string;
    outline?: boolean;
    outlineColor?: string;
    outlineWidth?: number;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    title,
    backgroundColor = colors.primary,
    textColor = colors.onPrimary,
    style,
    onPress,
    ...props
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor },
                style
            ]}
            onPress={onPress} // Added onPress here
            {...props}
        >
            <Text style={[styles.text, { color: textColor }]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
    }
});

export default CustomButton;