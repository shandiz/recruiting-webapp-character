import { memo } from 'react';
import { CLASS_LIST } from '../../consts';

const ClassRequirements = ({ selectedClass, onClose }) => {
  if (!selectedClass) return null;

  return (
    <div>
      <h2>{ selectedClass } Minimum Requirements</h2>
      { Object.entries(CLASS_LIST[ selectedClass ]).map(([ attr, min ]) => (
        <p key={attr}>
          { attr }: { min }
        </p>
      ))}
      <button className="button" onClick={onClose}>Close Requirement View</button>
    </div>
  );
};

export default memo(ClassRequirements);