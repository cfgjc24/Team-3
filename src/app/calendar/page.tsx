"use client";

import React, { useEffect, useState } from "react";
import "./Calendar.css";

const Schedule: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedTime, setSelectedTime] = useState<{
    time: string;
    day: string;
    count: number;
  } | null>(null);
  const [userSlots, setUserSlots] = useState<{ day: string; time: string }[]>(
    [],
  ); // State to track selected slots

  // Function to handle button click
  const handleButtonClick = (day: string, time: string, count: number) => {
    setSelectedTime({ time, day, count });
    setShowForm(true);
  };

  // Function to handle form submission
  const handleSignUp = () => {
    if (selectedTime) {
      // Add the selected time slot to the user's list
      setUserSlots([
        ...userSlots,
        { day: selectedTime.day, time: selectedTime.time },
      ]);
    }
    setShowForm(false);
  };

  // Function to check if a slot is already selected by the user
  const isSlotSelected = (day: string, time: string) => {
    return userSlots.some((slot) => slot.day === day && slot.time === time);
  };

  // Define time intervals
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

  // Define the days of the week with specific dates
  const daysOfWeek = ["9/16", "9/17", "9/18", "9/19", "9/20", "9/21", "9/22"];

  // Define types for dummy data and block data
  type DummyEvent = {
    day: string;
    start: string;
    end: string;
    text: string;
  };

  type BlockData = {
    day: number;
    start: number;
    end: number;
    text: string;
  };

  // Sample events data with day, start and end times, and text labels
  const dummyData: DummyEvent[] = [
    { day: "9/20", start: "8:00", end: "16:00", text: "Alice" },
    { day: "9/20", start: "8:00", end: "16:00", text: "Bob" },
    { day: "9/21", start: "12:00", end: "13:00", text: "Carol" },
    { day: "9/22", start: "10:30", end: "14:00", text: "Dad" },
    { day: "9/19", start: "8:00", end: "16:00", text: "Alice" },
    { day: "9/18", start: "8:00", end: "16:00", text: "Bob" },
    { day: "9/29", start: "11:00", end: "13:00", text: "Carol" },
    { day: "9/22", start: "14:30", end: "15:00", text: "Dad" },
    { day: "9/20", start: "8:00", end: "16:00", text: "Alice" },
    { day: "9/20", start: "12:00", end: "18:00", text: "Bob" },
    { day: "9/21", start: "12:00", end: "13:00", text: "Carol" },
    { day: "9/22", start: "10:30", end: "14:00", text: "Dad" },
    { day: "9/20", start: "14:00", end: "19:00", text: "Alice" },
    { day: "9/18", start: "10:00", end: "16:00", text: "Bob" },
    { day: "9/21", start: "12:00", end: "13:00", text: "Carol" },
    { day: "9/22", start: "10:30", end: "14:00", text: "Dad" },
  ];

  // Function to convert time strings into total minutes since midnight
  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // Function to convert dummy data into block data compatible with the calendar layout
  const convertToBlockData = (
    dummyData: DummyEvent[],
    daysOfWeek: string[],
  ): BlockData[] => {
    return dummyData
      .map((event) => {
        // Find the index of the day in daysOfWeek array
        const dayIndex = daysOfWeek.indexOf(event.day) + 1;
        if (dayIndex === 0) return null; // Skip events that don't match any day in daysOfWeek

        // Convert start and end times to minutes
        const startMinutes = timeToMinutes(event.start);
        const endMinutes = timeToMinutes(event.end);

        // Calculate start and end blocks
        const startBlock = Math.floor(startMinutes / 60) - 8; // Adjust based on the start hour (8 AM)
        const endBlock = Math.floor(endMinutes / 60) - 8; // Adjust based on the start hour (8 AM)

        return {
          day: dayIndex,
          start: startBlock,
          end: endBlock,
          text: event.text,
        };
      })
      .filter(Boolean) as BlockData[]; // Remove any null results
  };

  const blockData = convertToBlockData(dummyData, daysOfWeek);

  useEffect(() => {
    console.log("Block Data:", blockData);
  }, [blockData]);

  // Function to determine the color based on the number of overlapping events
  const getColorByCount = (count: number): string => {
    if (count === 0) return "transparent";
    if (count === 1) return "#E0F2F1"; // Light teal
    if (count === 2) return "#B2DFDB"; // Muted green
    if (count === 3) return "#80CBC4"; // Medium muted teal
    return "#4DB6AC"; // Darker teal for 4 or more overlapping events
  };

  return (
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
          <div className="time-label">{time}</div>{" "}
          {/* Time labels aligned on the left */}
          <div className="day-columns">
            {Array.from({ length: 7 }).map((_, idx) => {
              const day = daysOfWeek[idx];
              // Count how many blocks cover this specific time slot
              const overlappingEvents = blockData.filter(
                (b) => b.day === idx + 1 && index >= b.start && index <= b.end,
              );
              const eventCount = overlappingEvents.length;

              return (
                <button
                  className={`grid-button ${isSlotSelected(day, time) ? "selected-slot" : ""}`}
                  key={idx}
                  style={{
                    backgroundColor: isSlotSelected(day, time)
                      ? "#9ca3af"
                      : getColorByCount(eventCount),
                    color: isSlotSelected(day, time) ? "#ffffff" : "#111827",
                  }}
                  onClick={() => handleButtonClick(day, time, eventCount)}
                  disabled={isSlotSelected(day, time)} // Disable the button if the slot is already selected
                >
                  {eventCount > 0 ? `${eventCount} need help` : ""}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Sign Up Form Modal */}
      {showForm && selectedTime && (
        <div className="modal">
          <div className="modal-content">
            <h3 className="modal-title">{`${selectedTime.count} people need help at ${selectedTime.time} on ${selectedTime.day}`}</h3>
            <p className="modal-text">Do you want to sign up for this time?</p>
            <div className="modal-actions">
              <button className="confirm-button" onClick={handleSignUp}>
                Yes, Sign Me Up
              </button>
              <button
                className="cancel-button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;
