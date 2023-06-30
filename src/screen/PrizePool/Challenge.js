import Box from '@commom/Box'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { useTranslation } from 'react-i18next'

const data = [
    {
        title: 'SIGN UP',
        describe: 'Register using your email',
        img: require('@images/prize/b1.png'),
    },
    {
        title: 'TRADE',
        describe: 'Trade and earn more profits',
        img: require('@images/prize/b2.png'),
    },
    {
        title: 'WIN PRIZES',
        describe: 'The more you trade the better chance you can win',
        img: require('@images/prize/b3.png'),
    },
]

const Challenge = () => {
    const { t } = useTranslation()

    return (
        <Box>
            {data.map((item) => {
                return (
                    <Box
                        key={item.title}
                        backgroundColor={'#3f355c'}
                        alignCenter
                        paddingVertical={20}
                        marginVertical={7}
                    >
                        <Img source={item.img} />
                        <Txt size={18} bold marginTop={15}>
                            {t(item.title)}
                        </Txt>
                        <Box marginTop={10}>
                            <Txt bold>
                                {t(item.describe)}
                            </Txt>
                        </Box>
                    </Box>
                )
            })}
        </Box>
    )
}

export default Challenge