import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import Modality from '@reuse/Modality'
import { theme } from '@theme/index'
import { contrys } from '@util/country'
import { FlatList } from 'react-native'
import { CHANGE_FIELD, CHANGE_MODAL } from './Kyc'

const ModalCountry = ({ show, dispatch }) => {
    const renderItem = ({ item }) => {
        return (
            <Btn
                padding={15}
                alignCenter={false}
                onPress={() => dispatch({type: CHANGE_MODAL, field: 'country', value: item})}
            >
                <Txt>{item}</Txt>
            </Btn>
        )
    }

    return (
        <Modality
            show={show}
            setShow={() => dispatch({ type: CHANGE_FIELD, field: 'modalCountry', value: false })}
        >
            <Box width={'80%'} height={'80%'} backgroundColor={theme.colors.gray5}>
                <FlatList
                    data={contrys}
                    renderItem={renderItem}
                    keyExtractor={item => item}
                />
            </Box>
        </Modality>
    )
}

export default ModalCountry