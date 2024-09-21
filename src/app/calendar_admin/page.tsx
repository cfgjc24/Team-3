"use client";

import React, { useState, useEffect } from "react";
import "./Calendar.css";

const Schedule: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{
    day: string;
    time: string;
    clients: { id: number; name: string; email: string; startTime: string; endTime: string, assigned: boolean }[];
  } | null>(null);
  const [checkedClients, setCheckedClients] = useState<Set<number>>(new Set());
  const [clientData, setClientData] = useState<DataEvent[]>([]);
  const [removedClients, setRemovedClients] = useState<DataEvent[]>([]); // State to track removed clients

  const timeIntervals = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
  ];

  const daysOfWeek = ["9/16", "9/17", "9/18", "9/19", "9/20", "9/21", "9/22"];

  type DataEvent = {
    id: number;
    day: string;
    startTime: string;
    endTime: string;
    name: string;
    email: string;
    assigned: boolean;
  };

  // State for storing the grid data
  const [gridData, setGridData] = useState<{
    [day: string]: {
      [time: string]: { id: number; name: string; email: string; startTime: string; endTime: string; assigned: boolean }[];
    };
  }>({});

  // Function to convert time strings into total minutes since midnight
  const timeToMinutes = (time: string | undefined): number => {
    if (!time || typeof time !== "string") {
      console.error("Invalid time format:", time);
      return 0; // Return 0 or handle the error appropriately
    }
    const [timePart, period] = time.split(" ");
    const [hoursStr, minutesStr] = timePart.split(":");
    let hours = parseInt(hoursStr);
    const minutes = parseInt(minutesStr);

    if (period === "PM" && hours !== 12) {
      hours += 12;
    } else if (period === "AM" && hours === 12) {
      hours = 0;
    }

    return hours * 60 + minutes;
  };

  // Function to process client data directly into grid data
  const processGridData = (data: DataEvent[]) => {
    const newGridData: {
      [day: string]: {
        [time: string]: { id: number; name: string; email: string; startTime: string; endTime: string; assigned: boolean }[];
      };
    } = {};

    data.forEach((event) => {
      const { id, day, startTime, endTime, name, email, assigned } = event;
      if (!newGridData[day]) {
        newGridData[day] = {};
      }

      const startMinutes = timeToMinutes(startTime);
      const endMinutes = timeToMinutes(endTime);
      const startIndex = timeIntervals.findIndex(
        (time) => timeToMinutes(time) >= startMinutes,
      );
      const endIndex = timeIntervals.findIndex(
        (time) => timeToMinutes(time) >= endMinutes,
      );

      // Loop through each time slot covered by the event and create individual slot entries
      for (let i = startIndex; i <= endIndex && i < timeIntervals.length; i++) {
        const time = timeIntervals[i];
        if (!newGridData[day][time]) {
          newGridData[day][time] = [];
        }

        newGridData[day][time].push({ id, name, email, startTime, endTime, assigned });
      }
    });

    setGridData(newGridData);
  };

  // Fetch client data from the server
  useEffect(() => {
    const fetchClientData = async () => {
        try {
        const response = await fetch('http://localhost:4000/clients'); // Ensure the endpoint matches your backend setup
        if (!response.ok) {
            throw new Error('Failed to fetch client data');
        }
        const data = await response.json();
        setClientData(data); // Store the fetched data in state

        // Initialize removed clients with those already assigned
        const initiallyRemoved = data.filter((client: DataEvent) => client.assigned === true);
        setRemovedClients(initiallyRemoved);

        } catch (error) {
        console.error('Error fetching client data:', error);
        }
    };

    fetchClientData();
  }, []);

  // Process the fetched client data into grid data
  useEffect(() => {
    processGridData(clientData);
  }, [clientData]);

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

  // Remove checked clients from the grid and client data
  const handleRemoveClients = () => {
    if (selectedSlot) {
      const updatedClients = selectedSlot.clients.filter(
        (client) => !checkedClients.has(client.id),
      );

      // Update gridData by removing selected clients
      setGridData((prevGridData) => {
        const newGridData = { ...prevGridData };
        if (
          newGridData[selectedSlot.day] &&
          newGridData[selectedSlot.day][selectedSlot.time]
        ) {
          newGridData[selectedSlot.day][selectedSlot.time] = updatedClients;
        }
        return newGridData;
      });

      // Track removed clients and update the removedClients list
      const removed = selectedSlot.clients
        .filter((client) => checkedClients.has(client.id))
        .map((client) => ({
          ...client,
          day: selectedSlot.day, // Add the missing 'day' property
        }));
      setRemovedClients((prev) => [...prev, ...removed]);

      // Update clientData to remove clients only from specific time slots
      const updatedClientData = clientData.filter(
        (event) => !checkedClients.has(event.id),
      );
      setClientData(updatedClientData);

      setShowForm(false);
    }}


  const getColorByCount = (count: number): string => {
    if (count === 0) return "transparent";
    if (count === 1) return "#D6E4FF";
    if (count === 2) return "#A8C7FF";
    if (count === 3) return "#7AA9FF";
    return "#5b91f5";
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
                    {count > 0 ? `${count} clients` : ""}
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
                    <th>Start</th>
                    <th>End</th>
                    <th>Select</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedSlot.clients.map((client, index) => (
                    <tr key={index}>
                      <td>{client.name}</td>
                      <td>{client.email}</td>
                      <td>{client.startTime}</td>
                      <td>{client.endTime}</td>
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
              <button
                className="close-button"
                onClick={() => setShowForm(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="admin-dashboard">
        {/* History of Removed Clients */}

        <div className="history-section">
          <h1>Removed Clients History</h1>
          <table className="client-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Start</th>
                <th>End</th>
              </tr>
            </thead>
            <tbody>
              {removedClients.map((client, index) => (
                <tr key={index}>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{client.startTime}</td>
                  <td>{client.endTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
