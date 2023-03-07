import { View, StyleSheet } from 'react-native'
import React from 'react'
import Modality from '@reuse/Modality'
import Box from '@commom/Box'
import { theme } from '@theme/index'
import Txt from '@commom/Txt'

const ModalHistoryDetail = ({ show, setShow, t, profile, history }) => {
    return (
        <Modality
            show={show}
            setShow={setShow}
            animation={'slide'}
        >
            <Box
                backgroundColor={theme.colors.background}
                width={'90%'}
                marginTop={-200}
                padding={10}
            >
                <View style={styles.container}>
                    <Txt bold>{t('Sender')}</Txt>
                    <Txt>{history?.userName}</Txt>
                </View>

                <View style={styles.container}>
                    <Txt bold>{t('Receiver')}</Txt>
                    <Txt>{history?.userNameTo}</Txt>
                </View>

                <View style={styles.container}>
                    <Txt bold>{t('Amount')}</Txt>
                    {profile.email === history?.email ?
                        <Txt bold color='red'>-${history?.amount}</Txt> :
                        <Txt bold color={theme.colors.lightGreen2}>+${history?.amount}</Txt>
                    }
                </View>

                <View style={styles.container}>
                    <Txt bold>{t('Note')}</Txt>
                    <Txt>{history?.note}</Txt>
                </View>

                <View style={styles.container}>
                    <Txt bold>{t('Time')}</Txt>
                    <Txt>{history?.created_at}</Txt>
                </View>
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
        marginVertical: 10,
    }
})