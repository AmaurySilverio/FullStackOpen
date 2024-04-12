import { useState, useEffect } from "react";
import axios from "axios";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";

const App = ({ people }) => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3005/persons").then((response) => {
      console.log("Promise fulfilled");
      setPersons(response.data);
    });
  }, []);
  console.log("render", persons.length, "persons");
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newContact = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    if (persons.find((person) => person.name === newContact.name)) {
      alert(`${newContact.name} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
      return false;
    }
    setPersons(persons.concat(newContact));
    setNewName("");
    setNewNumber("");
    // console.log('form submitted', event.target);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handlePhonebookSearchChange = (event) => {
    console.log(event.target.value);
    setNewSearch(event.target.value);

    // let filteredSearch = persons.filter((person) =>
    //   person.name.toLowerCase().includes(newSearch)
    // );
    // console.log(filteredSearch);
    // setFilteredPersons(filteredSearch);
    // if (event.target.value === '') {
    //   setFilteredPersons([]);
    // }
  };
  const handlePhonebookSearchSubmit = (event) => {
    event.preventDefault();
    let filteredSearch = persons.filter((person) =>
      person.name.toLowerCase().includes(newSearch)
    );
    setFilteredPersons(filteredSearch);
    console.log(filteredSearch);
    setNewSearch("");
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        value={newSearch}
        onChange={handlePhonebookSearchChange}
        onClick={handlePhonebookSearchSubmit}
        persons={filteredPersons}
      />
      <h3>Add Person To Phonebook</h3>
      <PersonForm
        onSubmit={handleFormSubmit}
        nameValue={newName}
        onNameChange={handleNameChange}
        numberValue={newNumber}
        onNumberChange={handleNumberChange}
      />
      <Persons persons={[...persons]} title="Numbers" />
    </div>
  );
};

export default App;
