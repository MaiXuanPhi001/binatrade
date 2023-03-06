import React from 'react'
import Modality from '@reuse/Modality'
import Box from '@commom/Box'
import { theme } from '@theme/index'
import Txt from '@commom/Txt'
import Btn from '@commom/Btn'
import { StyleSheet, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { converNetwork } from '@method/format'
import Img from '@commom/Img'

const ModalDetailHistory = ({ show, setShow, histoyDetail }) => {
    const { t } = useTranslation()

    return (
        <Modality
            show={show}
            setShow={setShow}
            animation={'slide'}
        >
            <Box
                width={'95%'}
                backgroundColor={theme.colors.drawer}
                marginTop={-400}
            >
                <Box
                    row
                    alignCenter
                    padding={15}
                    justifySpaceBetween
                    borderBottomWidth={1}
                    borderColor={'#303030'}
                >
                    <Txt size={15} bold>Deposit infomation</Txt>
                    <Btn>
                        <Txt size={20} color={'#747e8a'}>X</Txt>
                    </Btn>
                </Box>

                <Box paddingHorizontal={10}>
                    <View style={styles.container}>
                        <Txt>{t('Status')}</Txt>
                        <Box
                            alignCenter
                            justifyCenter
                            padding={3}
                            radius={5}
                            backgroundColor={'#162311'}
                            borderWidth={1}
                            borderColor={'#274916'}
                        >
                            <Txt color={'#69bd38'}>{t('Success')}</Txt>
                        </Box>
                    </View>

                    <View style={styles.container}>
                        <Txt>{t('Time')}</Txt>
                        <Txt>{t(histoyDetail?.created_at)}</Txt>
                    </View>

                    <View style={styles.container}>
                        <Txt>{t('Network')}</Txt>
                        <Txt>{t(converNetwork(histoyDetail?.coin_key))}</Txt>
                    </View>

                    <View style={styles.container}>
                        <Txt>{t('Amount')}</Txt>
                        <Txt bold>+$ {t(histoyDetail?.amount)}</Txt>
                    </View>

                    <View style={styles.container}>
                        <Txt>TxID</Txt>
                        <Box
                            row
                            alignCenter
                            width={'80%'}
                            paddingHorizontal={15}
                        >
                            <Txt right marginRight={10}>{histoyDetail?.address}</Txt>
                            <Btn>
                                <Img
                                    source={require('@images/wallet/copy.png')}
                                    width={20}
                                    height={20}
                                />
                            </Btn>
                        </Box>
                    </View>
                </Box>
            </Box>
        </Modality>
    )
}

export default ModalDetailHistory

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10
    }
})