import { theme } from '@theme/index';
import { getSize } from '@util/responsive';
import { isNumber } from 'lodash';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { handleMargin, handlePadding } from '../shared';

const Txt = ({
    onPress,
    flex,
    flexShrink,
    flexGrow,
    size = 14,
    color = 'white',
    fontFamily,
    center,
    right,
    left,
    justify,
    padding,
    margin,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    paddingVertical,
    paddingHorizontal,
    marginVertical,
    marginHorizontal,
    absolute,
    style,
    fontType = 'regular',
    bold,
    lineHeight,
    animated,
    customFont = 'default',
    textDecorationLine,
    children,
    numberOfLines,
    alignSelf,
    ...textProps
}) => {
    const textStyle = [
        alignSelf && { alignSelf },
        flex && { flex: 1 },
        flexShrink && { flexShrink: 1 },
        flexGrow && { flexGrow: 1 },
        { fontWeight: theme.fonts.fontWeight[fontType] },
        bold && { fontWeight: 'bold' },
        { color: theme.colors[color] || color },
        center && { textAlign: 'center' },
        right && { textAlign: 'right' },
        left && { textAlign: 'left' },
        justify && { textAlign: 'justify' },
        absolute && { position: 'absolute' },
        padding && { ...handlePadding(getSize.m(padding)) },
        margin && { ...handleMargin(getSize.m(margin)) },
        paddingTop && { paddingTop: getSize.m(paddingTop) },
        paddingRight && { paddingRight: getSize.m(paddingRight) },
        paddingBottom && { paddingBottom: getSize.m(paddingBottom) },
        paddingLeft && { paddingLeft: getSize.m(paddingLeft) },
        marginBottom && { marginBottom: getSize.m(marginBottom) },
        marginTop && { marginTop: getSize.m(marginTop) },
        marginRight && { marginRight: getSize.m(marginRight) },
        marginLeft && { marginLeft: getSize.m(marginLeft) },
        paddingHorizontal && { paddingHorizontal: getSize.m(paddingHorizontal) },
        paddingVertical && { paddingVertical: getSize.m(paddingVertical) },
        marginHorizontal && { marginHorizontal: getSize.m(marginHorizontal) },
        marginVertical && { marginVertical: getSize.m(marginVertical) },
        isNumber(lineHeight) && { lineHeight: getSize.m(lineHeight) },
        { fontSize: getSize.m(size) },
        fontFamily && { fontFamily: fontFamily },
        textDecorationLine && { textDecorationLine },
        { ...StyleSheet.flatten(style) },
    ];

    return (
        <Text
            style={textStyle}
            {...textProps}
            numberOfLines={numberOfLines}
            onPress={onPress}
        >
            {children}
        </Text>
    );
};

export default Txt;
