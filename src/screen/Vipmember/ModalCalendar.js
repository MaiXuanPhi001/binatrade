import Modality from '@reuse/Modality'
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { getToDayYMD } from '@method/date'
import { width } from '@util/responsive'
import { useState } from 'react';
import Box from '@commom/Box';

LocaleConfig.locales['fr'] = {
    monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    today: "Aujourd'hui"
};
LocaleConfig.defaultLocale = 'fr';

const ModalCalendar = ({ show, setShow, onSetDate }) => {
    const [selected, setSelected] = useState('');

    return (
        <Modality
            show={show}
            setShow={setShow}
        >
            <Box width={width}>
                <Calendar
                    onDayPress={day => {
                        onSetDate(day)
                        setShow(false)
                    }}
                    markedDates={{
                        [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
                    }}
                    maxDate={getToDayYMD()}
                />
            </Box>
        </Modality>
    )
}

export default ModalCalendar