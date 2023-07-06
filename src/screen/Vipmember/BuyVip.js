import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useNavigation } from '@react-navigation/native'
import ButtonUser from '@reuse/ButtonUser'
import Header from '@reuse/Header'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import Cell from './Cell'
import { Alert, Image } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { profileSelector } from '@selector/userSelector'
import contants from '@util/contants'
import Img from '@commom/Img'
import Clipboard from '@react-native-clipboard/clipboard';
import ModalBuyVip from './ModalBuyVip'
import { useState } from 'react'
import { buyMemberVip } from '@service/fundingService'
import ModalError from './ModalError'
import routes from '@util/routes'
import userSlice from '@slice/userSlice'
import { navigate } from '@navigation/navigationRef'
import { getProfileThunk } from '@asyncThunk/userAsyncThunk'

const steps = [
    { title: 'Invite friends', img: require('@images/vip/step1.png') },
    { title: 'Friends signup', img: require('@images/vip/step2.png') },
    { title: 'Ges a corresponding proportion of commission', img: require('@images/vip/step3.png') },
]

const BuyVip = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const profile = useSelector(profileSelector)
    const [loading, setLoading] = useState(false)
    const [isShowModalBuyVIP, setShowModalBuyVIP] = useState(false)
    const [isShowModalError, setShowModalError] = useState(false)

    const LINK = `${contants.HOSTING}/signup/${profile.referral}`

    const handleBuyMemberVip = async () => {
        setLoading(true)
        const res = await buyMemberVip()
        if (!res.error && !res.status) {
            setShowModalError(true)
        } else {
            Alert.alert(res.message)
            dispatch(getProfileThunk())
        }
        setLoading(false)
        setShowModalBuyVIP(false)
    }

    const handleDeposit = async () => {
        setShowModalError(false)
        dispatch(userSlice.actions.setScreenChoose(routes.WALLET))
        navigate(routes.WALLET)
    } 

    return (
        <KeyBoardSafe>
            <Header navigation={navigation} colorIcon={'white'} />
            <Box>
                <Image
                    source={require('@images/vip/bg-affiliate.png')}
                    style={{ opacity: 0.5, height: '100%', position: 'absolute' }}
                />
                <Box padding={20}>
                    <Txt bold size={16} marginTop={100}>
                        {t('You need to buy VIP license to receive VIP commissions and trading commissions')}
                    </Txt>
                    <ButtonUser
                        onPress={() => setShowModalBuyVIP(true)}
                        text={t('Buy now $100')}
                        width={180}
                        height={45}
                        marginTop={20}
                        style={{ marginBottom: 20 }}
                    />
                    <Cell
                        title={'Registration link'}
                        content={LINK}
                        onPress={() => Clipboard.setString(LINK)}
                    />
                    <Cell
                        title={'Invitation code'}
                        content={profile.referral}
                        onPress={() => Clipboard.setString(profile.referral)}
                    />
                </Box>

                <Box padding={20} marginBottom={60}>
                    {steps.map(step =>
                        <Box
                            row
                            key={step.title}
                            alignCenter
                            marginVertical={10}
                        >
                            <Img
                                source={step.img}
                                width={35}
                                height={35}
                                marginRight={15}
                            />
                            <Box width={'80%'}>
                                <Txt bold size={15} numberOfLines={2}>
                                    {t(step.title)}
                                </Txt>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
            <ModalBuyVip
                show={isShowModalBuyVIP}
                setShow={setShowModalBuyVIP}
                onBuyMemberVip={handleBuyMemberVip}
                loading={loading}
            />
            <ModalError 
                show={isShowModalError}
                setShow={setShowModalError}
                onDeposit={handleDeposit}
            />
        </KeyBoardSafe>
    )
}

export default BuyVip