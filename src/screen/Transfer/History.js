import Box from '@commom/Box'
import Txt from '@commom/Txt'
import LoadingWhite from '@reuse/LoadingWhite'
import Pagination from '@reuse/Pagination'
import { profileSelector } from '@selector/userSelector'
import { getHistoryTransfer } from '@service/fundingService'
import { theme } from '@theme/index'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import HeaderTableHistory from './HeaderTableHistory'
import ItemHistory from './ItemHistory'
import ModalHistoryDetail from './ModalHistoryDetail'

const History = ({ COLOR }) => {
    const { t } = useTranslation()
    const profile = useSelector(profileSelector)
    const [historys, setHistorys] = useState([])
    const [loading, setLoading] = useState(true)
    const [historyDetail, setHistoryDetail] = useState({})
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        handleGetHistoryTransfer(1)
    }, [])

    const handleGetHistoryTransfer = async (page) => {
        setLoading(true)
        const res = await getHistoryTransfer({
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
                        onNext={() => handleGetHistoryTransfer(page + 1)}
                        onBack={() => handleGetHistoryTransfer(page - 1)}
                    />
                    <HeaderTableHistory />
                    {historys.map(history =>
                        <ItemHistory
                            key={history.id}
                            history={history}
                            onShowDetailHistory={handleShowDetailHistory}
                            t={t}
                            email={profile.email}
                            COLOR={COLOR}
                        />
                    )}
                </>
            )}
            <ModalHistoryDetail
                show={showModal}
                setShow={setShowModal}
                t={t}
                historyDetail
                profile={profile}
                history={historyDetail}
            />
        </Box>
    )
}

export default History