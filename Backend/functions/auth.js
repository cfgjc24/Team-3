/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-require-imports */
const crypto = require("node:crypto");

const {
  caseData,
  sessionNoteData,
  providerData,
  adminData,
} = require("../data/data"); // Import the JSON data

function attemptSignIn(data) {
  const email = data.email;
  const userType = data.userType;
  const hashedPassword = crypto
    .createHash("sha256") // Specify the hashing algorithm, e.g., 'sha256'
    .update(data.password) // The data you want to hash
    .digest("hex");

  if (userType === "admin") {
    admin = adminData.find((admin) => admin.email === email);
    if (admin) {
      hashedPasswordTwo = crypto
        .createHash("sha256") // Specify the hashing algorithm, e.g., 'sha256'
        .update(admin.password) // The data you want to hash
        .digest("hex");
      return admin ? hashedPassword === hashedPasswordTwo : null;
    }
    return false;
  } else if (userType === "provider") {
    provider = providerData.find((provider) => provider.email === email);
    if (provider) {
      hashedPasswordTwo = crypto
        .createHash("sha256") // Specify the hashing algorithm, e.g., 'sha256'
        .update(provider.password) // The data you want to hash
        .digest("hex");
    }
    return provider ? hashedPassword === hashedPasswordTwo : null;
  }

  return "failed";
}

module.exports = attemptSignIn;
