import { memo, useState } from 'react';
import { CLASS_LIST } from '../../consts';
import ClassRequirements from '../classRequirements/ClassRequirements';

const ClassList = ({ attributes }) => {
  const [ selectedClass, setSelectedClass ] = useState(null);

  const isClassEligible = cls =>
    Object.entries(CLASS_LIST[ cls ]).every(
      ([ attr, min ]) => attributes[ attr ] >= min
    );

  return (
    <div>
      <h2>Classes</h2>
      {Object.keys(CLASS_LIST).map(cls => (
        <p
          key={cls}
          onClick={() => setSelectedClass(cls)}
          style={{
            cursor: 'pointer',
            textDecoration: isClassEligible(cls) ? 'underline' : 'none',
            color: isClassEligible(cls) ? '#f00' : '#fff',
          }}
        >
          {cls}
        </p>
      ))}
      {selectedClass && (
        <ClassRequirements
          selectedClass={selectedClass}
          onClose={() => setSelectedClass(null)}
        />
      )}
    </div>
  );
};

export default memo(ClassList);
