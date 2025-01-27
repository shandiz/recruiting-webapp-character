import { memo } from 'react';
import { SKILL_LIST } from '../../consts';

const SkillList = ({ skills, attributes, onSkillChange }) => {
  const calculateModifier = value => Math.floor((value - 10) / 2);

  return (
    <div>
      <h2>Skills</h2>
      {SKILL_LIST.map(skill => {
        const modifier = calculateModifier(attributes[ skill.attributeModifier ]);
        const total = skills[ skill.name ] + modifier;

        return (
          <div key={skill.name}>
            <span>{skill.name} - Points: {skills[ skill.name ]} </span>
            <button onClick={() => onSkillChange(skill.name, 1)}>+</button>
            <button onClick={() => onSkillChange(skill.name, -1)}>-</button>
            <span> Modifier ({skill.attributeModifier}): {modifier} Total: {total}</span>
          </div>
        );
      })}
    </div>
  );
}

export default memo(SkillList);
