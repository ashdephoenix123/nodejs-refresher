const asyncHandler = require("express-async-handler");

// @desc GET all contacts
// @routes /api/contacts
// @access public

const getContacts = asyncHandler(async (req, res) => {
  res.status(200).json({ data: "Get all Contacts!" });
});

// @desc POST contacts
// @routes /api/contacts
// @access public

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields i.e. name, email and phone are mandatory!");
  }
  res.status(201).json({
    data: `Data created for ${name} \t email: ${email} \t phone: ${phone}`,
  });
});

// @desc Get single contact
// @routes /api/contacts
// @access public

const getContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Contact Get for id ${req.params.id}` });
});

// @desc UPDATE single contact
// @routes /api/contacts
// @access public

const updateContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Contact Updated for id ${req.params.id}` });
});

// @desc UPDATE single contact
// @routes /api/contacts
// @access public

const deleteContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Contact Deleted for id ${req.params.id}` });
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
