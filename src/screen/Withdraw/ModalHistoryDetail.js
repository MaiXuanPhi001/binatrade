import React from 'react'
import Modality from '@reuse/Modality'
import Box from '@commom/Box'
import { theme } from '@theme/index'
import Txt from '@commom/Txt'
import Btn from '@commom/Btn'
import { StyleSheet, View } from 'react-native'
import { converNetwork } from '@method/format'
import { THEME } from './ItemHistory'

const ModalHistoryDetail = ({ show, setShow, history, t }) => {
    const status = history?.status === 1 ? THEME.SUCCESS : THEME.CANCEL 

    return (
        <Modality
            show={show}
            setShow={setShow}
            animation={'slide'}
        >
            <Box
                width={'95%'}
                backgroundColor={theme.colors.drawer}
                marginTop={-200}
            >
                <Box
                    row
                    alignCenter
                    padding={15}
                    justifySpaceBetween
                    borderBottomWidth={1}
                    borderColor={'#303030'}
                >
                    <Txt size={15} bold>{t('Withdraw information')}</Txt>
                    <Btn onPress={() => setShow(false)}>
                        <Txt size={20} color={'#747e8a'}>X</Txt>
                    </Btn>
                </Box>

                <Box paddingHorizontal={10}>
                    <View style={styles.container}>
                        <Txt>{t('Network')}</Txt>
                        <Txt>{t(converNetwork(history?.network))}</Txt>
                    </View>

                    <View style={styles.container}>
                        <Txt>{t('Amount')}</Txt>
                        <Txt bold>${t(history?.amount)}</Txt>
                    </View>

                    <View style={styles.container}>
                        <Txt>{t('Network Fee')}</Txt>
                        <Txt bold>${t(history?.feeWidthdraw)}</Txt>
                    </View>

                    <View style={styles.container}>
                        <Txt>{t('Amount received')}</Txt>
                        <Txt bold>${t(history?.balanceWidthdraw)}</Txt>
                    </View>

                    <View style={styles.container}>
                        <Txt>TxID</Txt>
                        <Txt right marginRight={10}>{history?.hash}</Txt>
                    </View>

                    <View style={styles.container}>
                        <Txt>{t('Time')}</Txt>
                        <Txt>{t(history?.created_at)}</Txt>
                    </View>

                    <View style={styles.container}>
                        <Txt>{t('Status')}</Txt>
                        <Box
                            alignCenter
                            justifyCenter
                            padding={3}
                            radius={5}
                            backgroundColor={status.background}
                            borderWidth={1}
                            borderColor={status.border}
                        >
                            <Txt color={status.color}>{t(status.text)}</Txt>
                        </Box>
                    </View>
                </Box>
            </Box>
        </Modality>
    )
}

export default ModalHistoryDetail

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10
    }
})