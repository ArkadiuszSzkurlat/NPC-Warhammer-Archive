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
  handleChange: (e: MouseEvent) => void;
}) => {
  const i = index.toString();

  return (
    <input
      className="npc_stats-single"
      type="number"
      value={stat}
      name={i}
      disabled={!editable}
      onChange={(e: any) => {
        handleChange(e);
      }}
      min="1"
      max="100"
    ></input>
  );
};

export default StatInput;
