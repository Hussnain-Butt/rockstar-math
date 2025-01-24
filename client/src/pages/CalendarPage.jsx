import React from 'react'
import CalendarBanner from '../components/banners/CalendarBanner'
import Calendar from '../components/Calendar'
function CalendarPage() {
    return (
        <>
            <CalendarBanner />
            <div className="my-10">
                <Calendar />
            </div>
        </>
    )

}

export default CalendarPage