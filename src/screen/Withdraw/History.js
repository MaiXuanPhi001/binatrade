import Box from '@commom/Box'
import Txt from '@commom/Txt'
import LoadingWhite from '@reuse/LoadingWhite'
import Pagination from '@reuse/Pagination'
import HeaderTableHistory from '@screen/Deposit/HeaderTableHistory'
import { getHistoryWidthdraw } from '@service/fundingService'
import { theme } from '@theme/index'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ItemHistory from './ItemHistory'
import ModalHistoryDetail from './ModalHistoryDetail'

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