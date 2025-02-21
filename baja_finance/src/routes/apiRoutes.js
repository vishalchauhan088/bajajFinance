const express = require("express");

const User = require("../model/User");

const router = express.Router();

// GET endpoint: returns an operation code
router.get("/", (req, res) => {
  res.json({ operation_code: "OPERATION_12345" });
});
// POST endpoint: creates a new user with provided data
router.post("/", async (req, res) => {
  const {
    status,
    full_name,
    dob, // expected in format "dd mm yy"
    collegeEmailId,
    collegeRollNumber,
    numbers,
    alphabets,
  } = req.body;

  // Validate required fields
  if (!status || !full_name || !dob || !collegeEmailId || !collegeRollNumber) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Remove spaces from dob to format it as ddmmyy (e.g., "17 09 99" becomes "170999")
    const formattedDob = dob.replace(/\s+/g, "");

    // Generate the user_id in the format: full_name_dob
    // Convert full_name to lowercase and replace spaces with underscores
    const generatedUserId = `${full_name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_")}_${formattedDob}`;

    // Compute the highest alphabet from the alphabets array (using lexicographical comparison)
    let highest_alphabet = "";
    if (Array.isArray(alphabets) && alphabets.length > 0) {
      highest_alphabet = alphabets.reduce(
        (max, curr) => (curr > max ? curr : max),
        alphabets[0]
      );
    }

    // Create new user in the database using the generated user_id
    const newUser = await User.create({
      status,
      userId: generatedUserId,
      collegeEmailId,
      collegeRollNumber,
      numbers: Array.isArray(numbers) ? numbers : [],
      alphabets: Array.isArray(alphabets) ? alphabets : [],
      dob,
    });

    // Return the response with the specified format
    res.status(201).json({
      is_success: true,
      user_id: generatedUserId,
      email: collegeEmailId,
      "roll number": collegeRollNumber,
      numbers: Array.isArray(numbers) ? numbers : [],
      alphabets: Array.isArray(alphabets) ? alphabets : [],
      highest_alphabet,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /bfhl/user/

// GET /bfhl/filter?filter=m,B,1&fields=numbers,alphabets,userId
router.get("/filter", async (req, res) => {
  try {
    // Expecting a comma-separated filter string, e.g., "m,B,1"
    let filterParam = req.query.filter;
    if (!filterParam) {
      return res.status(400).json({ error: "Missing filter query parameter" });
    }

    // Split the filter string into an array and trim whitespace
    const filterArray = filterParam.split(",").map((item) => item.trim());

    // Separate filter elements into letterFilters and numberFilters
    const letterFilters = [];
    const numberFilters = [];
    filterArray.forEach((item) => {
      if (/^\d+$/.test(item)) {
        numberFilters.push(Number(item));
      } else if (/^[a-zA-Z]$/.test(item)) {
        letterFilters.push(item);
      }
    });

    // Build query conditions: each letter filter must be present (case-insensitive) in alphabets,
    // and each number filter must be present in numbers.
    const conditions = [];

    letterFilters.forEach((letter) => {
      conditions.push({
        alphabets: { $elemMatch: { $regex: `^${letter}$`, $options: "i" } },
      });
    });

    numberFilters.forEach((num) => {
      // numbers field should include this number
      conditions.push({ numbers: num });
    });

    const query = conditions.length > 0 ? { $and: conditions } : {};

    // Build projection based on optional "fields" query parameter
    let projection = {};
    if (req.query.fields) {
      const fieldsArray = req.query.fields.split(",").map((f) => f.trim());
      fieldsArray.forEach((field) => {
        projection[field] = 1;
      });
      // Always include _id unless explicitly excluded (optional)
      projection["_id"] = 0;
    }

    const results = await User.find(query, projection);
    res.status(200).json(results);
  } catch (error) {
    console.error("Filter error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

module.exports = router;
