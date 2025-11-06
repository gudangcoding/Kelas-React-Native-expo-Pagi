import React, { useState } from 'react';
import { Animated, StyleSheet, TextInput, View } from 'react-native';
import colors from '../app/constants/colors';

interface CustomInputProps {
    label: string;
    value: string;
    onChangeText?: (text: string) => void;
    placeholder?: string;
    secureTextEntry?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({ 
    label, 
    value, 
    onChangeText, 
    placeholder,
    secureTextEntry
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [animation] = useState(new Animated.Value(value ? 1 : 0));

    const handleFocus = () => {
        setIsFocused(true);
        Animated.timing(animation, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const handleBlur = () => {
        setIsFocused(false);
        if (!value) {
            Animated.timing(animation, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start();
        }
    };

    const labelStyle = {
        position: 'absolute' as 'absolute',
        left: 0,
        top: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [18, 0]
        }),
        fontSize: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 12]
        }),
        color: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [colors.gray, colors.primary]
        })
    } as any;

    return (
        <View style={styles.wrapInput}>
            <Animated.Text style={[styles.labelInput, labelStyle]}>
                {label}
            </Animated.Text>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={[
                    styles.textinput,
                    isFocused && styles.focused
                ]}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapInput: {
        marginBottom: 20,
        width: '100%',
        height: 60,
        position: 'relative',
    },
    labelInput: {
        position: 'absolute',
        left: 10,
    color: colors.gray,
        paddingHorizontal: 4,
        zIndex: 1,
    },
    textinput: {
        height: 50,
    borderColor: colors.gray,
        borderRadius: 5,
        borderWidth: 1,
        width: '100%',
        paddingHorizontal: 10,
        fontSize: 16,
        paddingTop: 8,
    },
    focused: {
    borderColor: colors.primary,
        borderWidth: 2,
        backgroundColor: colors.white,
    },
});

export default CustomInput;