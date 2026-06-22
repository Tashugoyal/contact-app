import express from "express";
const router = express.Router();

import { addContact, addContactPage, deleteContact, getContact, getContacts, updateContact, updateContactPage } from "../controller/contacts.controller.js";

router.get("/", getContacts);

router.get("/show-contacts/:id",getContact );

router.get("/add-contact",addContactPage);

router.post("/add-contact", addContact);

router.post("/update-contact/:id", updateContact);

router.get("/delete-contact/:id",deleteContact);

router.get("/update-contact/:id", updateContactPage);

export default router;