"use client";

import React, { useEffect, useState } from 'react';
import './Calendar.css';

const Schedule: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedTime, setSelectedTime] = useState<{
    time: string;
    day: string;
    count: number;
  } | null>(null);
  const [userSlots, setUserSlots] = useState<{ day: string; time: string }[]>([]);

  // Define time intervals
  const timeIntervals = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM',
  ];

  // Define the days of the week with specific dates
  const daysOfWeek = ['9/16', '9/17', '9/18', '9/19', '9/20', '9/21', '9/22'];

  // Define types for dummy data
  type DummyEvent = {
    day: string;
    start: string;
    end: string;
    text: string;
  };

  // Sample events data with day, start and end times, and text labels
  const dummyData: DummyEvent[] = [
    { day: '9/20', start: '8:00 AM', end: '4:00 PM', text: 'Alice' },
    { day: '9/20', start: '8:00 AM', end: '4:00 PM', text: 'Bob' },
    { day: '9/21', start: '12:00 PM', end: '1:00 PM', text: 'Carol' },
    { day: '9/22', start: '10:30 AM', end: '2:00 PM', text: 'Dad' },
    { day: '9/19', start: '8:00 AM', end: '4:00 PM', text: 'Alice' },
    { day: '9/18', start: '8:00 AM', end: '4:00 PM', text: 'Bob' },
    { day: '9/29', start: '11:00 AM', end: '1:00 PM', text: 'Carol' },
    { day: '9/22', start: '2:30 PM', end: '3:00 PM', text: 'Dad' },
    { day: '9/20', start: '8:00 AM', end: '4:00 PM', text: 'Alice' },
    { day: '9/20', start: '12:00 PM', end: '6:00 PM', text: 'Bob' },
    { day: '9/21', start: '12:00 PM', end: '1:00 PM', text: 'Carol' },
    { day: '9/22', start: '10:30 AM', end: '2:00 PM', text: 'Dad' },
    { day: '9/20', start: '2:00 PM', end: '7:00 PM', text: 'Alice' },
    { day: '9/18', start: '10:00 AM', end: '4:00 PM', text: 'Bob' },
    { day: '9/21', start: '12:00 PM', end: '1:00 PM', text: 'Carol' },
    { day: '9/22', start: '10:30 AM', end: '2:00 PM', text: 'Dad' },
  ];

  // Function to convert time strings into total minutes since midnight
  const timeToMinutes = (time: string): number => {
    const [timePart, period] = time.split(' ');
    const [hoursStr, minutesStr] = timePart.split(':');
    let hours = parseInt(hoursStr);
    const minutes = parseInt(minutesStr);

    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }

    return hours * 60 + minutes;
  };

  // Function to create gridData from eventsData
  const createGridData = (eventsData: DummyEvent[]) => {
    const gridData: { [day: string]: { [timeIndex: number]: number } } = {};

    eventsData.forEach((event) => {
      const day = event.day;
      if (!gridData[day]) {
        gridData[day] = {};
      }

      const startMinutes = timeToMinutes(event.start);
      const endMinutes = timeToMinutes(event.end);
      const startIndex = Math.floor(startMinutes / 60) - 8; // Adjust based on the start hour (8 AM)
      const endIndex = Math.floor(endMinutes / 60) - 8; // Adjust based on the start hour (8 AM)

      for (let timeIndex = startIndex; timeIndex <= endIndex; timeIndex++) {
        if (!gridData[day][timeIndex]) {
          gridData[day][timeIndex] = 0;
        }
        gridData[day][timeIndex] += 1; // Increment the count
      }
    });

    return gridData;
  };

  // State for eventsData and gridData
  const [eventsData, setEventsData] = useState<DummyEvent[]>(dummyData);
  const [gridData, setGridData] = useState<{ [day: string]: { [timeIndex: number]: number } }>({});

  useEffect(() => {
    const newGridData = createGridData(eventsData);
    setGridData(newGridData);
  }, [eventsData]);

  // Function to handle button click
  const handleButtonClick = (day: string, time: string, count: number) => {
    setSelectedTime({ time, day, count });
    setShowForm(true);
  };

  // Function to handle form submission
  const handleSignUp = () => {
    if (selectedTime) {
      const { day, time } = selectedTime;
      const timeIndex = timeIntervals.indexOf(time);

      setGridData((prevGridData) => {
        const newGridData = { ...prevGridData };
        if (newGridData[day] && newGridData[day][timeIndex] !== undefined) {
          newGridData[day] = { ...newGridData[day] }; 
          newGridData[day][timeIndex] = Math.max(0, newGridData[day][timeIndex] - 1);
        }
        return newGridData;
      });

      // Add slot to userSlots
      setUserSlots([...userSlots, { day, time }]);
    }
    setShowForm(false);
  };

  // Function to check if a slot is already selected by the user
  const isSlotSelected = (day: string, time: string) => {
    return userSlots.some((slot) => slot.day === day && slot.time === time);
  };

  // Function to determine the color based on the number of overlapping events
  const getColorByCount = (count: number): string => {
    if (count === 0) return 'transparent';
    if (count === 1) return '#E0F2F1'; // Light teal
    if (count === 2) return '#B2DFDB'; // Muted green
    if (count === 3) return '#80CBC4'; // Medium muted teal
    return '#4DB6AC'; // Darker teal for 4 or more overlapping events
  };

  return (
    <div className="admin-dashboard">
      <header className="header">
        <h1>Please enter your availability as a provider: </h1>
      </header>

      <div className="weekly-schedule">
        <div className="header-row">
          <div className="time-label empty-space"></div>
          {daysOfWeek.map((day, index) => (
            <div className="day-label" key={index}>
              {day}
            </div>
          ))}
        </div>
        {timeIntervals.map((time, index) => (
          <div className="row" key={index}>
            <div className="time-label">{time}</div>
            <div className="day-columns">
              {daysOfWeek.map((day, idx) => {
                const eventCount = gridData[day]?.[index] || 0;

                return (
                  <button
                    className={`grid-button ${isSlotSelected(day, time) ? 'selected-slot' : ''}`}
                    key={idx}
                    style={{
                      backgroundColor: isSlotSelected(day, time)
                        ? '#9ca3af'
                        : getColorByCount(eventCount),
                      color: isSlotSelected(day, time) ? '#ffffff' : '#111827',
                    }}
                    onClick={() => handleButtonClick(day, time, eventCount)}
                    disabled={isSlotSelected(day, time)}
                  >
                    {eventCount > 0 ? `${eventCount} needed` : ''}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {showForm && selectedTime && (
          <div className="modal">
            <div className="modal-content">
              <h3 className="modal-title">
                {`${selectedTime.count} people needed at ${selectedTime.time} on ${selectedTime.day}`}
              </h3>
              <p className="modal-text">Do you want to sign up for this time?</p>
              <div className="modal-actions">
                <button className="confirm-button" onClick={handleSignUp}>
                  Yes, Sign Me Up
                </button>
                <button className="cancel-button" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;
