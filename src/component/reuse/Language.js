import React, { useState } from 'react'
import Box from '@commom/Box'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { theme } from '@theme/index'
import Btn from '@commom/Btn'
import { useTranslation } from 'react-i18next'
import Animated from 'react-native-reanimated'
import { StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import contants from '@util/contants'

const Language = ({ marginRight = 20 }) => {
    const { t, i18n } = useTranslation()
    const [drop, setDrop] = useState(false)

    const languages = [
        {
            title: 'English',
            value: 'en',
            image: require('@images/america.png'),
        },
        {
            title: 'Vietnamese',
            value: 'vn',
            image: require('@images/vietnam.png'),
        },
    ]

    const handleChangeValue = async (language) => {
        i18n.changeLanguage(language)
        setDrop(false)
        await AsyncStorage.setItem(contants.LANGUAGE, language)
    }

    const languageChoose = languages.filter(language => language.value === i18n.language)[0]

    return (
        <Box
            alignSelf={'flex-end'}
            marginRight={marginRight}
            alignStart
            width={140}
            zIndex={10}
        >
            <Btn
                onPress={() => setDrop(!drop)}
                row
                justifyStart
                borderWidth={1}
                borderColor={theme.colors.gray4}
                paddingVertical={5}
                paddingHorizontal={7}
                radius={5}
                width={'100%'}
            >
                <Img
                    source={languageChoose.image}
                    width={25}
                    height={25}
                    marginRight={5}
                />
                <Txt size={17}>{t(languageChoose.title)}</Txt>
            </Btn>
            {drop &&
                <Animated.View style={[styles.animatedView]}>
                    {languages.map(language =>
                        <Item
                            key={language.value}
                            language={language}
                            t={t}
                            i18n={i18n}
                            onChangeValue={handleChangeValue}
                        />
                    )}
                </Animated.View>
            }
        </Box>
    )
}

const Item = ({ language, t, i18n, onChangeValue }) => {
    return (
        <Btn
            onPress={() => onChangeValue(language.value)}
            row
            justifyStart
            paddingVertical={5}
            paddingHorizontal={7}
            backgroundColor={i18n.language === language.value && 'black'}
        >
            <Img
                source={language.image}
                width={25}
                height={25}
                marginRight={5}
            />
            <Txt size={17}>{t(language.title)}</Txt>
        </Btn>
    )
}

export default Language

const styles = StyleSheet.create({
    animatedView: {
        width: '100%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: theme.colors.gray4,
        marginTop: 10,
        position: 'absolute',
        top: 35,
        backgroundColor: theme.colors.background
    }
})