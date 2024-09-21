"use client"; // Marks this as a Client Component

import { useState } from "react";

export default function FormPage() {
  const [activeForm, setActiveForm] = useState(""); // State to manage active form

  // Handlers for showing forms based on button clicks
  const showForm1 = () => setActiveForm("travelExpense");
  const showForm2 = () => setActiveForm("providerLog");
  const showForm3 = () => setActiveForm("flexFund");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <div className="space-x-4 mb-8">
        {/* Black buttons to switch between forms */}
        <button
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
          onClick={showForm1}
        >
          Employee Travel Expense Voucher
        </button>

        <button
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
          onClick={showForm2}
        >
          Provider Log
        </button>

        <button
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
          onClick={showForm3}
        >
          Flex Fund Log
        </button>
      </div>

      {/* Conditionally render the forms based on which button was clicked */}
      {activeForm === "travelExpense" && <TravelExpenseForm />}
      {activeForm === "providerLog" && <ProviderLogForm />}
      {activeForm === "flexFund" && <FlexFundForm />}
    </div>
  );
}

// Form 1: Employee Travel Expense Voucher
function TravelExpenseForm() {
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg max-w-2xl w-full">
      <h1 className="text-2xl font-bold text-center mb-6">Employee Travel Expense Voucher</h1>
      <div className="mb-4">
        <label className="block font-bold">Month:</label>
        <input type="text" className="border p-2 w-full" placeholder="Enter month" />
      </div>
      <div className="mb-4">
        <label className="block font-bold">Name:</label>
        <input type="text" className="border p-2 w-full" placeholder="Enter name" />
      </div>
      <div className="mb-4">
        <label className="block font-bold">City:</label>
        <input type="text" className="border p-2 w-full" placeholder="Enter city" />
      </div>
      <div className="mb-4">
        <label className="block font-bold">Zip Code:</label>
        <input type="text" className="border p-2 w-full" placeholder="Enter zip code" />
      </div>
      <div className="mb-4">
        <label className="block font-bold">Travel From:</label>
        <input type="text" className="border p-2 w-full" placeholder="From where" />
      </div>
      <div className="mb-4">
        <label className="block font-bold">Travel To:</label>
        <input type="text" className="border p-2 w-full" placeholder="To where" />
      </div>
      <div className="mb-4">
        <label className="block font-bold">Miles:</label>
        <input type="text" className="border p-2 w-full" placeholder="Miles traveled" />
      </div>
      <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full">
        Submit
      </button>
    </div>
  );
}

// Form 2: Provider Log
function ProviderLogForm() {
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg max-w-2xl w-full">
      <h1 className="text-2xl font-bold text-center mb-6">Provider Log</h1>
      <div className="mb-4">
        <label className="block font-bold">Billing Month/Year:</label>
        <input type="text" className="border p-2 w-full" placeholder="Enter billing month/year" />
      </div>
      <div className="mb-4">
        <label className="block font-bold">Child's Name:</label>
        <input type="text" className="border p-2 w-full" placeholder="Enter child's name" />
      </div>
      <div className="mb-4">
        <label className="block font-bold">Provider Name:</label>
        <input type="text" className="border p-2 w-full" placeholder="Enter provider name" />
      </div>
      <div className="mb-4">
        <label className="block font-bold">Service (Circle One):</label>
        <select className="border p-2 w-full">
          <option value="PSR">PSR</option>
          <option value="FPSS">FPSS</option>
          <option value="YPST">YPST</option>
          <option value="CPST">CPST</option>
          <option value="RCS">RCS</option>
          <option value="PVS">PVS</option>
          <option value="SES">SES</option>
          <option value="CFASS">CFASS</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block font-bold">Date of Service:</label>
        <input type="text" className="border p-2 w-full" placeholder="Enter service date" />
      </div>
      <div className="mb-4">
        <label className="block font-bold">Time of Service:</label>
        <input type="text" className="border p-2 w-full" placeholder="Enter time of service" />
      </div>
      <div className="mb-4">
        <label className="block font-bold">Total Hours:</label>
        <input type="text" className="border p-2 w-full" placeholder="Enter total hours" />
      </div>
      <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full">
        Submit
      </button>
    </div>
  );
}

// Form 3: Flex Fund Log
function FlexFundForm() {
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg max-w-2xl w-full">
      <h1 className="text-2xl font-bold text-center mb-6">Flex Fund Log</h1>
      <div className="mb-4">
        <label className="block font-bold">Billing Date:</label>
        <input type="text" className="border p-2 w-full" placeholder="Enter billing date" />
      </div>
      <div className="mb-4">
        <label className="block font-bold">Child's Name:</label>
        <input type="text" className="border p-2 w-full" placeholder="Enter child's name" />
      </div>
      <div className="mb-4">
        <label className="block font-bold">Provider's Name:</label>
        <input type="text" className="border p-2 w-full" placeholder="Enter provider's name" />
      </div>
      <div className="mb-4">
        <label className="block font-bold">Service Type:</label>
        <input type="text" className="border p-2 w-full" placeholder="Enter service type" />
      </div>
      <div className="mb-4">
        <label className="block font-bold">Date of Receipt:</label>
        <input type="text" className="border p-2 w-full" placeholder="Enter receipt date" />
      </div>
      <div className="mb-4">
        <label className="block font-bold">Store/Venue:</label>
        <input type="text" className="border p-2 w-full" placeholder="Enter store/venue" />
      </div>
      <div className="mb-4">
        <label className="block font-bold">Amount of Expense:</label>
        <input type="text" className="border p-2 w-full" placeholder="Enter amount" />
      </div>
      <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full">
        Submit
      </button>
    </div>
  );
}
