"use client";

import React, { useState } from 'react';
import { Calendar, momentLocalizer, View, SlotInfo } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendarStyle.css'; // Import your custom styles

// Set up moment.js as the localizer
const localizer = momentLocalizer(moment);

// Define an interface for the event objects
interface CourtHearingEvent {
  title: string;
  start: Date;
  end: Date;
}

// Custom toolbar component
const CustomToolbar: React.FC<{
  label: string;
  onNavigate: (action: 'PREV' | 'NEXT' | 'TODAY') => void;
  onView: (view: View) => void;
  activeView: string;
}> = ({ label, onNavigate, onView, activeView }) => {
  return (
    <div className="custom-toolbar">
      {/* Back and Next buttons */}
      <div className="navigation-buttons">
        <button className="toolbar-button" onClick={() => onNavigate('PREV')}>
          Prev
        </button>
        <button className="toolbar-button" onClick={() => onNavigate('TODAY')}>
          Today
        </button>
        <button className="toolbar-button" onClick={() => onNavigate('NEXT')}>
          Next
        </button>
      </div>

      {/* Display current label (month/week/day) */}
      <span className="toolbar-label">{label}</span>

      {/* View buttons (Month, Week, Day) */}
      <div className="toolbar-buttons">
        <button
          className={activeView === 'month' ? 'toolbar-button active' : 'toolbar-button'}
          onClick={() => onView('month')}
        >
          Month
        </button>
        <button
          className={activeView === 'week' ? 'toolbar-button active' : 'toolbar-button'}
          onClick={() => onView('week')}
        >
          Week
        </button>
        <button
          className={activeView === 'day' ? 'toolbar-button active' : 'toolbar-button'}
          onClick={() => onView('day')}
        >
          Day
        </button>
      </div>
    </div>
  );
};

const CourtHearingCalendar: React.FC = () => {
  const [events, setEvents] = useState<CourtHearingEvent[]>([
    {
      title: 'Court Hearing: Case #1234',
      start: new Date(2024, 9, 14, 10, 0), 
      end: new Date(2024, 9, 14, 12, 0),
    },
    {
      title: 'Court Hearing: Case #5678',
      start: new Date(2024, 9, 23, 9, 30),
      end: new Date(2024, 9, 23, 11, 30),
    },
    {
      title: 'Court Hearing: Case #4321',
      start: new Date(2024, 10, 16, 14, 0),
      end: new Date(2024, 10, 16, 15, 30),
    },
  ]);

  // State to manage the current view
  const [currentView, setCurrentView] = useState<View>('month');

  // State to manage the current date
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // State to track the active toolbar button
  const [activeButton, setActiveButton] = useState<string>('month');

  // Handle view change
  const handleViewChange = (view: View) => {
    setCurrentView(view);
    setActiveButton(view);
  };

  // Handle navigation (Today, Back, Next)
  const handleNavigate = (action: 'PREV' | 'NEXT' | 'TODAY') => {
    if (action === 'TODAY') {
      setCurrentDate(new Date());
    } else if (action === 'PREV') {
      setCurrentDate(prevDate => {
        const newDate = new Date(prevDate);
        if (currentView === 'month') newDate.setMonth(newDate.getMonth() - 1);
        else if (currentView === 'week') newDate.setDate(newDate.getDate() - 7);
        else newDate.setDate(newDate.getDate() - 1);
        return newDate;
      });
    } else if (action === 'NEXT') {
      setCurrentDate(prevDate => {
        const newDate = new Date(prevDate);
        if (currentView === 'month') newDate.setMonth(newDate.getMonth() + 1);
        else if (currentView === 'week') newDate.setDate(newDate.getDate() + 7);
        else newDate.setDate(newDate.getDate() + 1);
        return newDate;
      });
    }
  };

  // Handle clicking on any empty date slot (full box)
  const handleSlotSelect = (slotInfo: SlotInfo) => {
    setCurrentDate(slotInfo.start); // Set the clicked slot date
    setCurrentView('day');          // Switch to the day view
    setActiveButton('day');         // Set the active button to 'day'
  };

  return (
    <div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        view={currentView}
        onView={handleViewChange}
        date={currentDate}
        onNavigate={setCurrentDate}
        onSelectSlot={handleSlotSelect} // Handle clicking on empty slots
        selectable // Enable selecting empty slots
        views={['month', 'week', 'day']}
        step={30} // Show 30-minute intervals
        timeslots={2} // Number of timeslots per interval
        style={{ height: 500 }}
        components={{
          toolbar: (props) => (
            <CustomToolbar
              label={props.label}
              onNavigate={props.onNavigate}
              onView={props.onView}
              activeView={activeButton}
            />
          ),
        }}
      />
    </div>
  );
};

export default CourtHearingCalendar;
