const fs = require("fs");
const path = require("path");
const { nanoid } = require("nanoid");


contactsPath = path.resolve(__dirname, "./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, function (err, data) {
    if (err) {
      console.log(`Reading error: ${err.message}`)
      return;
    } else {
      const contacts = JSON.parse(data);
      console.log("Contacts list:");
      console.table(contacts);
    }
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.log(`Reading error: ${err.message}`)
      return;
    }
    const contacts = JSON.parse(data);
  
    const contactById = contacts.find(({ id }) => id === contactId);
   
    if (!contactById) {
     console.log(`Contact with ID: ${contactId} was not found.`);
      return;
    }
    console.log("Contacts by ID:");
    console.table([contactById]);
  });
}


function removeContact(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.log(`Reading error: ${err.message}`)
      return;
    }
    const contacts = JSON.parse(data);
  
    const contactIndex = contacts.findIndex(({ id }) => id === contactId);
   
    if (contactIndex === -1) {
      console.log(`Contact with ID: ${contactId} was not found.`);
      return;
    }
    const removedContacts = contacts.splice(contactIndex, 1);
     fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
      if (err) {
        console.log(`Reading error: ${err.message}`);
        return;
      }
      console.log("Removed contact:");
      console.table(removedContacts);
    });
  });
}


function addContact(name, email, phone) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) {
      console.log(`Reading error: ${err.message}`)
      return;
    }
    const contacts = JSON.parse(data);
    const newContact = { id: nanoid(), name, email, phone };
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
      if (err) {
        console.log(`Reading error: ${err.message}`);
        return;
      }
      console.log("Contact added successfully");
      console.table(newContact);
    });
  });
}

module.export = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};