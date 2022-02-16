import React from 'react';

const Skill = ({
  editable,
  text,
  index,
  handleChange,
}: {
  editable: any;
  text: string;
  index: number;
  handleChange: any;
}) => {
  let i = index.toString();
  return (
    <li>
      <input
        type='text'
        value={text}
        name={i}
        disabled={!editable}
        onChange={handleChange}
      ></input>
    </li>
  );
};

export default Skill;
