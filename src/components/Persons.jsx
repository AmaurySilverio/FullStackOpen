const Persons = ({ persons, title }) => {
  return (
    <>
      <h3>{title}</h3>
      <div>
        {persons.map((person) => (
          <p key={person.id}>
            {person.name}: {person.number}
          </p>
        ))}
        {/* {console.log("hello", persons)} */}
      </div>
    </>
  );
};

export default Persons;
