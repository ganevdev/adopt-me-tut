import pet, { ANIMALS } from '@frontendmasters/pet';
import React, { useContext, useEffect, useState } from 'react';

import Results from './Results';
import ThemeContext from './ThemeContext';
import useDropdown from './useDropdown';

const SearchParams = () => {
  const [location, updateLocation] = useState('Seattle, WA');
  const [breeds, updateBreeds] = useState([]);
  const [pets, setPets] = useState([]);
  const [animal, AnimalDropdown] = useDropdown('Animal', 'dog', ANIMALS);
  const [breed, BreedDropdown, updateBreed] = useDropdown('Breed', '', breeds);
  const [theme, setTheme] = useContext(ThemeContext);

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal,
    });

    console.log('animals', animals);

    setPets(animals || []);
  }

  useEffect(() => {
    updateBreeds([]);
    updateBreed('');

    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      updateBreeds(breedStrings);
    }, console.error);
  }, [animal, updateBreed]);

  return (
    <div className="search-params">
      <form
        onSubmit={e => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={e => updateLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={e => setTheme(e.target.value)}
            onBlur={e => setTheme(e.target.value)}
          >
            <option value="blue">blue</option>
            <option value="darkBlue">darkBlue</option>
            <option value="pink">pink</option>
            <option value="chartreuse">chartreuse</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
