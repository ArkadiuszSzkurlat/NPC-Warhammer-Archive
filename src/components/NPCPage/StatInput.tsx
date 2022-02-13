import React from 'react';

const StatInput = ({
  stat,
  index,
  editable,
  handleChange,
}: {
  stat: number;
  index: number;
  editable: boolean;
  handleChange: any;
}) => {
  let i = index.toString();

  return (
    <input
      className='npc_stats-single'
      type='number'
      value={stat}
      name={i}
      disabled={!editable}
      onChange={handleChange}
    ></input>
  );
};

export default StatInput;
