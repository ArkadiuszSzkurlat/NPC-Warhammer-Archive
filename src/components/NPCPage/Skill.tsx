import React from 'react';

const Skill = ({
  editable,
  text,
  index,
  handleChange,
  itemType,
}: {
  editable: any;
  text: string;
  index: number;
  handleChange: any;
  itemType: string;
}) => {
  let i = index.toString();
  return (
    <li>
      <input
        type='text'
        value={text}
        name={i}
        disabled={!editable}
        onChange={(e) => handleChange(e, itemType, i)}
      />
    </li>
  );
};

export default Skill;
