import React, {useState, useEffect, useCallback} from 'react';
import { ATTRIBUTE_LIST, SKILL_LIST } from './consts';
import CharacterCard from "./components/characterCard/CharacterCard";

const apiUrl = `https://recruiting.verylongdomaintotestwith.ca/api/{shandiz}/character`;

require('./App.css');

const App = () => {
    const [ characters, setCharacters ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isSaving, setIsSaving ] = useState(false);

    useEffect(() => {
        const fetchCharacters = async () => {
            setIsLoading(true);

            try {
                const response = await fetch(apiUrl, { headers: { 'Content-Type': 'application/json' } });
                if (response.ok) {
                    const data = await response.json();
                    setCharacters(data.body?.length ? data.body : [ createNewCharacter() ]);
                } else {
                    console.error('Failed to fetch characters:', response.statusText);
                    setCharacters([ createNewCharacter() ]);
                }
            } catch (error) {
                console.error('Error fetching characters:', error);
                setCharacters([ createNewCharacter() ]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCharacters();
    }, []);

    const saveCharacters = async () => {
        setIsSaving(true);

        try {
            await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(characters),
            });
            alert('Successfully saved!');
        } catch (error) {
            console.error('Error saving characters:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const createNewCharacter = useCallback(() => ({
        name: `Character ${characters.length + 1}`,
        attributes: Object.fromEntries(ATTRIBUTE_LIST.map(attr => [attr, 10])),
        skills: Object.fromEntries(SKILL_LIST.map(skill => [skill.name, 0])),
    }), [ characters.length ]);

    const updateCharacterAttributes =  useCallback((index, attr, delta) => {
        setCharacters(prev => {
            const character = prev[index];
            const totalAttributes = Object.values(character.attributes).reduce((sum: number, value: number) => sum + value, 0);

            if (totalAttributes + delta > 70) {
                alert('A character can have up to 70 Delegated Attribute Points.');
                return prev;
            }

            const updatedAttributes = {
                ...character.attributes,
                [ attr ]: Math.max(character.attributes[ attr ] + delta, 0),
            };

            return prev.map((char, i) => (i === index ? { ...char, attributes: updatedAttributes } : char));
        });
    }, []);

    const updateCharacterSkills =  useCallback((index, skill, delta) => {
        setCharacters(prev => {
            const character = prev[ index ];
            const intelligenceModifier = Math.floor((character.attributes[ 'Intelligence' ] - 10) / 2);
            const totalPoints = 10 + 4 * intelligenceModifier;
            const pointsSpent = Object.values(character.skills).reduce((sum: number, val: number) => sum + val, 0);

            if (delta > 0 && pointsSpent >= totalPoints) {
                alert('You need more skill points! Upgrade intelligence to get more.');
                return prev;
            }

            const updatedSkills = {
                ...character.skills,
                [ skill ]: Math.max(character.skills[ skill ] + delta, 0),
            };

            return prev.map((char, i) => (i === index ? { ...char, skills: updatedSkills } : char));
        });
    }, []);

    const addNewCharacter = () => {
        setCharacters(prev => [ ...prev, createNewCharacter() ]);
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>React Coding Exercise</h1>
                <div className="header-buttons-container">
                    <button className="button" disabled={isSaving} onClick={saveCharacters}>Save Characters</button>
                    <button className="button" onClick={addNewCharacter}>Add Character</button>
                </div>
            </header>
            <section className="App-section">
                {isLoading ? (
                    <p>Loading ...</p>
                ) : (
                    characters.map((character, index) => (
                        <CharacterCard
                            key={index}
                            character={character}
                            index={index}
                            updateCharacterSkills={updateCharacterSkills}
                            updateCharacterAttributes={updateCharacterAttributes}
                        />
                    ))
                )}
            </section>
        </div>
    );
};

export default App;
