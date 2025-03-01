const Contact = require("../models/Contact");

const submitContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error saving contact form:", error);
    res.status(500).json({ message: "An error occurred. Please try again." });
  }
};

module.exports = { submitContactForm };