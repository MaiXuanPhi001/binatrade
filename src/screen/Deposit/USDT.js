import React, { useEffect, useState } from 'react'
import Txt from '@commom/Txt'
import Box from '@commom/Box'
import { styles } from '@screen/Profile/Infomation'
import { theme } from '@theme/index'
import { useTranslation } from 'react-i18next'
import { createWallet } from '@service/fundingService'
import ButtonUser from '@reuse/ButtonUser'
import QRCode from 'react-native-qrcode-svg'
import Warning from './Warning'
import LoadingWhite from '@reuse/LoadingWhite'
import Clipboard from '@react-native-clipboard/clipboard';

const USDT = () => {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(true)
    const [wallet, setWallet] = useState()

    useEffect(() => {
        handleCreateWallet()
    }, [])

    const handleCreateWallet = async () => {
        const res = await createWallet({
            symbol: "USDT.BEP20"
        })
        if (res.status) {
            setWallet(res.data)
            setLoading(false)
        }
    }

    const handleCopy = async () => {
        Clipboard.setString(wallet.address)
    }

    return (
        <Box style={[styles.container, { marginTop: 10 }]}>
            <Txt bold color={theme.colors.blueText} size={18}>{t('Wallet USDT')}</Txt>
            {loading ? (
                <LoadingWhite />
            ) : (
                <>
                    <ButtonUser
                        text={'BEP20'}
                        width={75}
                        height={35}
                        size={12}
                        marginTop={10}
                    />
                    {wallet?.address &&
                        <Box alignCenter marginTop={20}>
                            <QRCode
                                color={'white'}
                                backgroundColor={theme.colors.btnLogin}
                                value={wallet?.address}
                                size={150}
                            />
                            <Box width={240} marginTop={20}>
                                <Txt center bold size={13}>{wallet?.address}</Txt>
                            </Box>
                            <ButtonUser
                                text={t('Coppy address')}
                                onPress={handleCopy}
                                size={14}
                                height={40}
                                width={200}
                                marginTop={20}
                            />
                        </Box>
                    }
                    <Box marginTop={20} marginRight={20}>
                        <Warning text={t('You have to deposit at least 5 USDT to be credited. Any deposit that is less than 5 USDT will not be refunded.')} />
                        <Warning text={t('This deposit address only accepts USDT. Do not send other coins to it.')} />
                    </Box>
                </>
            )}
        </Box>
    )
}

export default USDT