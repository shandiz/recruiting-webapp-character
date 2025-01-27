import { memo, useState } from 'react'
import { SKILL_LIST } from '../../consts';

require('./SkillCheck.css');

const SkillCheck = ({ character }) => {
  const { skills, attributes } = character;
  const [ rollResult, setRollResult ] = useState(null);
  const [ skillCheck, setSkillCheck ] = useState({ skill: SKILL_LIST[0].name, dc: 10 });

  const handleSkillCheck = () => {
      const skill = SKILL_LIST.find(s => s.name === skillCheck.skill);

      const modifier = Math.floor((attributes[ skill.attributeModifier ] - 10) / 2);
      const totalSkill = skills[ skillCheck.skill ] + modifier;

      const randomRoll = Math.floor(Math.random() * 20) + 1;
      const success = totalSkill + randomRoll >= skillCheck.dc;

      setRollResult({
          randomRoll,
          totalSkill,
          success,
      });
  };

  const handleSkillCheckChange = (field, value) => {
      setSkillCheck(prev => ({
          ...prev,
          [ field ]: field === 'dc' ? Math.max(parseInt(value, 10) || 0, 0) : value,
      }));
  };

  return (
    <div className='skill-check-section'>
      <h2>Skill Check</h2>
      <div>
        <label>
          Skill:
          <select
            value={skillCheck.skill}
            onChange={e => handleSkillCheckChange('skill', e.target.value)}
          >
            {SKILL_LIST.map(skill => (
              <option key={skill.name} value={skill.name}>
                {skill.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          DC:
          <input
            type="number"
            value={skillCheck.dc}
            onChange={e => handleSkillCheckChange('dc', e.target.value)}
            min={0}
          />
        </label>
        <button className="button" onClick={handleSkillCheck}>Roll</button>
      </div>
      {rollResult && (
        <div>
          <p>Random Roll: {rollResult.randomRoll}</p>
          <p>
            Total Skill: {rollResult.totalSkill} (Modifier included) —{' '}
            {rollResult.success ? 'Success!' : 'Failure'}
          </p>
        </div>
      )}
    </div>
  );
}

export default memo(SkillCheck);
