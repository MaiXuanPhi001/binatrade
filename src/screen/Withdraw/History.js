import React, { useEffect, useState } from 'react'
import Txt from '@commom/Txt'
import { theme } from '@theme/index'
import { useTranslation } from 'react-i18next'
import Box from '@commom/Box'
import Pagination from '@reuse/Pagination'
import { getHistoryWidthdraw } from '@service/fundingService'
import { Alert } from 'react-native'
import HeaderTableHistory from '@screen/Deposit/HeaderTableHistory'
import ItemHistory from './ItemHistory'
import ModalHistoryDetail from './ModalHistoryDetail'
import LoadingWhite from '@reuse/LoadingWhite'

const History = () => {
    const { t } = useTranslation()
    const [historys, setHistorys] = useState([])
    const [loading, setLoading] = useState(true)
    const [historyDetail, setHistoryDetail] = useState({})
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        handleGetHistoryWidthdraw(1)
    }, [])

    const handleGetHistoryWidthdraw = async (page) => {
        setLoading(true)
        const res = await getHistoryWidthdraw({
            limit: 10,
            page
        })
        if (res.status) {
            setHistorys(res.data.array)
            setTotal(res.data.total)
            setPage(page)
            setLoading(false)
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
            <Txt bold color={theme.colors.blueText} size={18}>{t('History transferr')}</Txt>
            {loading ? (
                <LoadingWhite />
            ) : (
                <>
                    <Pagination
                        marginTop={10}
                        indexPage={page}
                        total={total}
                        onNext={() => handleGetHistoryWidthdraw(page + 1)}
                        onBack={() => handleGetHistoryWidthdraw(page - 1)}
                    />
                    <HeaderTableHistory />
                    {historys.map(history =>
                        <ItemHistory
                            key={history.id}
                            history={history}
                            onShowDetailHistory={handleShowDetailHistory}
                            t={t}
                        />
                    )}
                </>
            )}
            <ModalHistoryDetail
                show={showModal}
                setShow={setShowModal}
                t={t}
                history={historyDetail}
            />
        </Box>
    )
}

export default History