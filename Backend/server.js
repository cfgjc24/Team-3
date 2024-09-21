const express = require("express");
const {
  caseData,
  sessionNoteData,
  providerData,
  adminData,
} = require("./data/data"); // Import the JSON data
const app = express();

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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
