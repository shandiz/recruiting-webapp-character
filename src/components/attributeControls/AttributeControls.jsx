import { memo } from 'react';

const AttributeControls = ({ attributes, onAttributeChange }) => {
  const calculateModifier = value => Math.floor((value - 10) / 2);

  return (
    <div>
      <h2>Attributes</h2>
      {Object.entries(attributes).map(([attr, value]) => (
        <div key={attr}>
          <span>{attr}: {value} (Modifier: {calculateModifier(value)}) </span>
          <button onClick={() => onAttributeChange(attr, 1)}>+</button>
          <button onClick={() => onAttributeChange(attr, -1)}>-</button>
        </div>
      ))}
    </div>
  );
}

export default memo(AttributeControls);
