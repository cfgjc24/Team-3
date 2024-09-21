"use client";

import React, { useState, useEffect } from 'react';
import './Calendar.css';

const Schedule: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{
    day: string;
    time: string;
    clients: { id: number; name: string; email: string; start: string; end: string }[];
  } | null>(null);
  const [checkedClients, setCheckedClients] = useState<Set<number>>(new Set());

  // Sample dummy data with start and end times for each client
  const [dummyData, setDummyData] = useState<DummyEvent[]>([
    { id: 1, day: '9/20', start: '8:00 AM', end: '10:00 AM', name: 'Alice', email: 'alice@example.com' },
    { id: 2, day: '9/20', start: '8:00 AM', end: '9:00 AM', name: 'Bob', email: 'bob@example.com' },
    { id: 3, day: '9/21', start: '12:00 PM', end: '1:00 PM', name: 'Carol', email: 'carol@example.com' },
    { id: 4, day: '9/22', start: '10:30 AM', end: '2:00 PM', name: 'Dad', email: 'dad@example.com' },
    // Add more sample data as needed
  ]);

  const timeIntervals = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM',
  ];

  const daysOfWeek = ['9/16', '9/17', '9/18', '9/19', '9/20', '9/21', '9/22'];

  type DummyEvent = {
    id: number; // Unique identifier for each event
    day: string;
    start: string;
    end: string;
    name: string;
    email: string;
  };

  type TimeSlot = {
    id: number;
    day: string;
    time: string;
    name: string;
    email: string;
  };

  // State for storing the grid data
  const [gridData, setGridData] = useState<{
    [day: string]: {
      [time: string]: { id: number; name: string; email: string; start: string; end: string }[];
    };
  }>({});

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

  // New function to separate dummy data into individual time slots
  const separateTimeSlots = (data: DummyEvent[]): TimeSlot[] => {
    const separatedSlots: TimeSlot[] = [];

    data.forEach((event) => {
      const startMinutes = timeToMinutes(event.start);
      const endMinutes = timeToMinutes(event.end);
      const startIndex = timeIntervals.findIndex((time) => timeToMinutes(time) >= startMinutes);
      const endIndex = timeIntervals.findIndex((time) => timeToMinutes(time) >= endMinutes);

      // Loop through each time slot covered by the event and create individual slot entries
      for (let i = startIndex; i <= endIndex && i < timeIntervals.length; i++) {
        separatedSlots.push({
          id: event.id,
          day: event.day,
          time: timeIntervals[i],
          name: event.name,
          email: event.email,
        });
      }
    });

    return separatedSlots;
  };

  // Function to process separated slots into grid data
  const processGridData = (slots: TimeSlot[]) => {
    const newGridData: {
      [day: string]: {
        [time: string]: { id: number; name: string; email: string; start: string; end: string }[];
      };
    } = {};

    slots.forEach((slot) => {
      const { day, time, name, email, id } = slot;
      if (!newGridData[day]) {
        newGridData[day] = {};
      }
      if (!newGridData[day][time]) {
        newGridData[day][time] = [];
      }

      newGridData[day][time].push({ id, name, email, start: time, end: time });
    });

    setGridData(newGridData);
  };

  useEffect(() => {
    // Separate the dummy data into individual slots and process them into grid data
    const separatedSlots = separateTimeSlots(dummyData);
    processGridData(separatedSlots);
  }, [dummyData]);

  // Handle button click to show clients in the selected slot
  const handleButtonClick = (day: string, time: string) => {
    const clients = gridData[day]?.[time] || [];
    setSelectedSlot({ day, time, clients });
    setShowForm(true);
    setCheckedClients(new Set()); // Reset checked clients
  };

  // Toggle client selection when checkbox is clicked
  const handleCheckboxChange = (clientId: number) => {
    setCheckedClients((prev) => {
      const newChecked = new Set(prev);
      if (newChecked.has(clientId)) {
        newChecked.delete(clientId);
      } else {
        newChecked.add(clientId);
      }
      return newChecked;
    });
  };

  // Remove checked clients from the grid and dummy data
  const handleRemoveClients = () => {
    if (selectedSlot) {
      const updatedClients = selectedSlot.clients.filter(
        (client) => !checkedClients.has(client.id)
      );

      // Update gridData by removing selected clients
      setGridData((prevGridData) => {
        const newGridData = { ...prevGridData };
        if (newGridData[selectedSlot.day] && newGridData[selectedSlot.day][selectedSlot.time]) {
          newGridData[selectedSlot.day][selectedSlot.time] = updatedClients;
        }
        return newGridData;
      });

      // Update dummyData to remove clients only from specific time slots
      const updatedDummyData = dummyData.filter(
        (event) => !checkedClients.has(event.id)
      );
      setDummyData(updatedDummyData);

      setShowForm(false);
    }
  };

  const getColorByCount = (count: number): string => {
    if (count === 0) return 'transparent';
    if (count === 1) return '#E0F2F1';
    if (count === 2) return '#B2DFDB';
    return '#4DB6AC';
  };

  return (
    <div className="admin-dashboard">
    <header className="header">
      <h1>Assign providers and remove from calendar: </h1>
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
      </div>
      {timeIntervals.map((time, index) => (
        <div className="row" key={index}>
          <div className="time-label">{time}</div>
          <div className="day-columns">
            {daysOfWeek.map((day, idx) => {
              const clientsAtSlot = gridData[day]?.[time] || [];
              const count = clientsAtSlot.length;

              return (
                <button
                  className="grid-button"
                  key={idx}
                  style={{
                    backgroundColor: getColorByCount(count),
                  }}
                  onClick={() => handleButtonClick(day, time)}
                  disabled={count === 0}
                >
                  {count > 0 ? `${count} needed` : ''}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {showForm && selectedSlot && (
        <div className="modal">
          <div className="modal-content">
            <h3 className="modal-title">{`Clients needing help at ${selectedSlot.time} on ${selectedSlot.day}`}</h3>
            <table className="client-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {selectedSlot.clients.map((client, index) => (
                  <tr key={index}>
                    <td>{client.name}</td>
                    <td>{client.email}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={checkedClients.has(client.id)}
                        onChange={() => handleCheckboxChange(client.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="remove-button" onClick={handleRemoveClients}>
              Remove Selected Clients
            </button>
            <button className="close-button" onClick={() => setShowForm(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;
