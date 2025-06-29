const asyncHandler = require("express-async-handler");
const ContactModel = require("../models/contactModel");
// @desc GET all contacts
// @routes /api/contacts
// @access private

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await ContactModel.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

// @desc POST contacts
// @routes /api/contacts
// @access private

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields i.e. name, email and phone are mandatory!");
  }

  const findUser = await ContactModel.findOne({ email });
  if (findUser) {
    res.status(400);
    throw new Error("User already exists.");
  }

  const contact = await ContactModel.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

// @desc Get single contact
// @routes /api/contacts
// @access private

const getContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("No ID provided");
  }

  const findUser = await ContactModel.findOne({ _id: id });
  res.status(200).json(findUser);
});

// @desc UPDATE single contact
// @routes /api/contacts
// @access private

const updateContact = asyncHandler(async (req, res) => {
  const findUser = await ContactModel.findById(req.params.id);
  if (!findUser) {
    res.status(404);
    throw new Error("User not found.");
  }

  if (findUser.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User dont have peromission to update another user");
  }

  const updateUser = await ContactModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updateUser);
});

// @desc UPDATE single contact
// @routes /api/contacts
// @access private

const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error("Please provide an ID of the user.");
  }

  const findUser = await ContactModel.findById(id);
  if (!findUser) {
    res.status(404);
    throw new Error("User not found.");
  }

  if (findUser.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User dont have peromission to update another user");
  }

  const deleteUser = await ContactModel.deleteOne({ _id: id });
  res.status(200).json(deleteUser);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
