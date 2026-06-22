import Contact from "../models/contacts.models.js";
import mongoose from "mongoose";

export const getContacts = async (req, res) => {
  
    try {
      const {page=1, limit=3}=req.query
      const options={
        page:parseInt(page),
        limit:parseInt(limit),
      }
  
      const result=await Contact.paginate({},options)
//  const contacts = await Contact.find();
    // res.send(result);
 res.render("home", {
  totalDocs: result.totalDocs,
  limit: result.limit,
  totalPages: result.totalPages,
  currentPage: result.page,
  counter: result.pagingCounter,
  hasPrevPage: result.hasPrevPage,
  hasNextPage: result.hasNextPage,
  prevPage: result.prevPage,
  nextPage: result.nextPage,
  contacts: result.docs
});
  } catch (error) {
    res.render("500", { message: error });
  }
};

export const getContact = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.render("404", { message: "invalid Id" });
  }
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.render("404", { message: "Contact not found. " });
    res.render("show-contact", { contact });
  } catch (error) {
    res.render("500", { message: error });
  }
};

export const addContactPage = (req, res) => {
  res.render("add-contact");
};

export const addContact = async (req, res) => {
   try {
  const contact = req.body;
  await Contact.create(contact);
  res.redirect("/");
  } catch (error) {
    res.render("500", { message: error });
  }
  
};

export const updateContact = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.render("404", { message: "invalid Id" });
  }
  try {
   const contact= await Contact.findByIdAndUpdate(req.params.id, req.body);

    if (!contact) return res.render("404", { message: "Contact not found. " });
    res.redirect("/");
  } catch (error) {
    res.render("500", { message: error });
  }
};

export const deleteContact = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.render("404", { message: "invalid Id" });
  }
  try {
   const contact= await Contact.findByIdAndDelete(req.params.id);

    if (!contact) return res.render("404", { message: "Contact not found. " });
    res.redirect("/");
  } catch (error) {
    res.render("500", { message: error });
  }
};

export const updateContactPage = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.render("404", { message: "invalid Id" });
  }
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) return res.render("404", { message: "Contact not found. " });
    res.render("update-contact", { contact });
  } catch (error) {
    res.render("500", { message: error });
  }
};
