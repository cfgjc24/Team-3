/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-require-imports */
const express = require("express");
const {
  caseData,
  sessionNoteData,
  providerData,
  adminData,
  clientData,
} = require("./data/data"); // Import the JSON data

const attemptSignIn = require("./functions/auth");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send(caseData);
});

// Route to get all providers
app.get("/providers", (req, res) => {
  res.json(providerData);
});

// Route to get a specific provider by ID
app.get("/providers/:id", (req, res) => {
  const providerId = parseInt(req.params.id); // Get the provider ID from the request parameters
  const provider = providerData.find((provider) => provider.id === providerId); // Find the provider by ID

  if (provider) {
    res.json(provider); // If provider is found, return the provider data
  } else {
    res.status(404).json({ message: "Provider not found" }); // If provider is not found, return a 404 error
  }
});

// Route to get all cases by provider ID
app.get("/cases/provider/:providerId", (req, res) => {
  const providerId = parseInt(req.params.providerId); // Get the provider ID from the request parameters
  const cases = caseData.filter(
    (caseItem) => caseItem.providerId === providerId,
  ); // Filter cases by provider ID

  if (cases.length > 0) {
    res.json(cases); // If cases are found, return the list of cases
  } else {
    res.status(404).json({ message: "No cases found for this provider" }); // If no cases are found, return a 404 error
  }
});

// Route to get all cases with status "OPEN" by provider ID
app.get("/cases/open/provider/:providerId", (req, res) => {
  const providerId = parseInt(req.params.providerId); // Get the provider ID from the request parameters
  const openCases = caseData.filter(
    (caseItem) =>
      caseItem.providerId === providerId && caseItem.status === "OPEN",
  ); // Filter cases by provider ID and status "OPEN"

  if (openCases.length > 0) {
    res.json(openCases); // If open cases are found, return the list of open cases
  } else {
    res.status(404).json({ message: "No open cases found for this provider" }); // If no open cases are found, return a 404 error
  }
});

// Route to get all session notes
app.get("/session_notes", (req, res) => {
  res.json(sessionNoteData);
});

// Route to get all session notes by provider ID
app.get("/session_notes/provider/:providerId", (req, res) => {
  const providerId = parseInt(req.params.providerId); // Get the provider ID from the request parameters
  const sessionNotes = sessionNoteData.filter(
    (note) => note.providerId === providerId,
  ); // Filter session notes by provider ID

  if (sessionNotes.length > 0) {
    res.json(sessionNotes); // If session notes are found, return the list of notes
  } else {
    res
      .status(404)
      .json({ message: "No session notes found for this provider" }); // If no session notes are found, return a 404 error
  }
});

app.post("/sign-in", (req, res) => {
  const data = req.body;
  console.log(data);
  const resData = attemptSignIn(data);
  res.status(200).json(resData);
});

// Route to get all clients
app.get("/clients", (req, res) => {
  res.json(clientData); // Serve the client data
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
