import React, { memo } from 'react';
import { SkillCheck, AttributeControls, ClassList, SkillList } from '../../components'

require('./CharacterCard.css');

const CharacterCard = ({ character, index, updateCharacterAttributes, updateCharacterSkills }) => (
  <div className='character-card' key={index} >
    <h2>
      Character { index + 1 }
    </h2>
    <SkillCheck
      character={character}
    />
    <div className="character-status">
      <AttributeControls
        attributes={character.attributes}
        onAttributeChange={(attr, delta) => updateCharacterAttributes(index, attr, delta)}
      />
      <ClassList attributes={character.attributes} />
      <SkillList
        skills={character.skills}
        attributes={character.attributes}
        onSkillChange={(skill, delta) => updateCharacterSkills(index, skill, delta)}
      />
    </div>
  </div>
);

export default memo(CharacterCard);
