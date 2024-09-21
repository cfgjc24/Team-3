/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-require-imports */
const { hash } = require("crypto");

const {
  caseData,
  sessionNoteData,
  providerData,
  adminData,
} = require("./data/data"); // Import the JSON data

function attemptSignIn(data) {
  const email = data.email;
  const hashedPassword = hash(data.password);
}
