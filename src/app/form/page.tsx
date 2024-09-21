// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// export default function Form1() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({ /* form fields */ });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     console.log("Form 1 submitted:", formData);
//     // Redirect or provide feedback as needed
//   };

//   return (
//     <div className="flex flex-col min-h-screen p-4 sm:p-6 font-sans">
//       <main className="flex-grow flex flex-col gap-6 items-center justify-center">
//         <Card className="w-full max-w-md shadow-lg">
//           <CardHeader className="text-center">
//             <CardTitle className="text-2xl font-bold">Form 1</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit}>
//               {/* Your form fields here */}
//               <Button type="submit" className="w-full mt-4">
//                 Submit
//               </Button>
//             </form>
//           </CardContent>
//         </Card>
//         <Card className="w-full max-w-md shadow-lg">
//           <CardHeader className="text-center">
//             <CardTitle className="text-2xl font-bold">Form 2</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit}>
//               {/* Your form fields here */}
//               <Button type="submit" className="w-full mt-4">
//                 Submit
//               </Button>
//             </form>
//           </CardContent>
//         </Card>
//       </main>
//     </div>
//   );
// }
"use client"; // This marks the component as a Client Component

import { useState } from "react";

// Define a type for each row of the timesheet
type TimesheetRow = {
  date: string;
  time: string;
  totalHours: string;
  description: string;
};

export default function FormPage() {
  const [formData, setFormData] = useState({
    billingMonthYear: "",
    providerName: "",
    times: [{ date: "", time: "", totalHours: "", description: "" }] as TimesheetRow[], // Explicitly typing the times array
    overallTotalHours: "",
    staffSignature: "",
  });

  const handleInputChange = (index: number, field: keyof TimesheetRow, value: string) => {
    const updatedTimes = [...formData.times];
    updatedTimes[index][field] = value;
    setFormData({ ...formData, times: updatedTimes });
  };

  const addRow = () => {
    setFormData({
      ...formData,
      times: [...formData.times, { date: "", time: "", totalHours: "", description: "" }],
    });
  };

  const handleOverallChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <div className="bg-white p-6 shadow-lg rounded-lg max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-center mb-6">
          Lodestar Children's Services Non-billable Timesheet
        </h1>

        <div className="mb-4">
          <label className="block font-bold">Billing Month/Year:</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={formData.billingMonthYear}
            onChange={(e) => handleOverallChange("billingMonthYear", e.target.value)}
            placeholder="Enter month/year"
          />
        </div>

        <div className="mb-4">
          <label className="block font-bold">Provider Name:</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={formData.providerName}
            onChange={(e) => handleOverallChange("providerName", e.target.value)}
            placeholder="Enter provider name"
          />
        </div>

        <div>
          <table className="w-full table-auto mb-4 border">
            <thead>
              <tr>
                <th className="border px-2 py-1">Date</th>
                <th className="border px-2 py-1">Time (S)</th>
                <th className="border px-2 py-1">Total Hours</th>
                <th className="border px-2 py-1">Description</th>
              </tr>
            </thead>
            <tbody>
              {formData.times.map((row, index) => (
                <tr key={index}>
                  <td className="border px-2 py-1">
                    <input
                      type="text"
                      className="w-full p-1"
                      value={row.date}
                      onChange={(e) => handleInputChange(index, "date", e.target.value)}
                      placeholder="MM/DD/YYYY"
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <input
                      type="text"
                      className="w-full p-1"
                      value={row.time}
                      onChange={(e) => handleInputChange(index, "time", e.target.value)}
                      placeholder="Enter time"
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <input
                      type="text"
                      className="w-full p-1"
                      value={row.totalHours}
                      onChange={(e) => handleInputChange(index, "totalHours", e.target.value)}
                      placeholder="Total hours"
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <input
                      type="text"
                      className="w-full p-1"
                      value={row.description}
                      onChange={(e) => handleInputChange(index, "description", e.target.value)}
                      placeholder="Description"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={addRow}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Add Row
          </button>
        </div>

        <div className="mt-6">
          <label className="block font-bold">Overall Total Hours:</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={formData.overallTotalHours}
            onChange={(e) => handleOverallChange("overallTotalHours", e.target.value)}
            placeholder="Enter total hours"
          />
        </div>

        <div className="mt-4">
          <label className="block font-bold">Staff Signature:</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={formData.staffSignature}
            onChange={(e) => handleOverallChange("staffSignature", e.target.value)}
            placeholder="Enter signature"
          />
        </div>

        <button className="mt-6 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 w-full">
          Submit
        </button>
      </div>
    </div>
  );
}
