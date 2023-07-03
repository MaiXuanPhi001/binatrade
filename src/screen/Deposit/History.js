import React, { useEffect, useState } from 'react'
import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { theme } from '@theme/index'
import { useTranslation } from 'react-i18next'
import Pagination from '@reuse/Pagination'
import HeaderTableHistory from './HeaderTableHistory'
import { getHistoryDeposit } from '@service/fundingService'
import { Alert } from 'react-native'
import ItemHistory from './ItemHistory'
import ModalDetailHistory from './ModalDetailHistory'
import LoadingWhite from '@reuse/LoadingWhite'

const History = ({ COLOR }) => {
    const { t } = useTranslation()
    const [historys, setHistorys] = useState([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [historyDetail, setHistoryDetail] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        handleGetHistoryDeposit(1)
    }, [])

    const handleGetHistoryDeposit = async (page) => {
        setLoading(true)
        const res = await getHistoryDeposit({
            limit: 10,
            page
        })
        if (res.status) {
            setHistorys(res.data.array)
            setTotal(res.data.total)
            setLoading(false)
            setPage(page)
        } else {
            Alert.alert(t(res.message))
        }
    }

    const handleShowDetailHistory = async (history) => {
        setHistoryDetail(history)
        setShowModal(true)
    }

    return (
        <Box marginTop={20}>
            <Txt bold color={theme.colors.blueText} size={18}>{t('Deposit history')}</Txt>
            {loading ? (
                <LoadingWhite />
            ) : (
                <>
                    <Pagination
                        marginTop={10}
                        indexPage={page}
                        total={total}
                        onNext={() => handleGetHistoryDeposit(page + 1)}
                        onBack={() => handleGetHistoryDeposit(page - 1)}
                    />
                    <HeaderTableHistory />
                    {historys.map(history =>
                        <ItemHistory
                            key={history.id}
                            history={history}
                            onShowDetailHistory={handleShowDetailHistory}
                            t={t}
                            COLOR={COLOR}
                        />
                    )}
                </>
            )}
            <ModalDetailHistory
                show={showModal}
                setShow={setShowModal}
                histoyDetail={historyDetail}
            />
        </Box>
    )
}

export default History