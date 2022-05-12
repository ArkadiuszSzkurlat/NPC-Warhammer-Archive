import React, { useEffect, useState } from 'react';
import { Card, Avatar, Typography, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ListCardNPC from './ListCardNPC';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import AddNPCButton from './AddNPCButton';

const ListCardFolder = ({
  name,
  data,
  i,
  provided,
  snapshot,
}: {
  name: string;
  data: any;
  i: number;
  provided: any;
  snapshot: any;
}) => {
  const [clicked, setClicked] = useState(false);
  const [editable, setEditable] = useState(true);
  const [nameTest, setNameTest] = useState(name);
  const [star, setStar] = useState(true);
  useEffect(() => {
    console.log(snapshot);
  }, [snapshot]);

  return (
    <>
      <Card
        className="list-folderCard"
        sx={{ background: '#E3EDE6' }}
        elevation={8}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
      >
        <Avatar variant="square" />

        <input
          className="list-folderCard--input"
          type="text"
          value={nameTest}
          disabled={editable}
          onChange={(e) => {
            setNameTest(e.target.value);
          }}
        />
        <IconButton onClick={() => setStar(!star)}>
          <StarIcon
            // @ts-ignore: Unreachable code error
            sx={{ color: star && '#c9c600' }}
          />
        </IconButton>
        <IconButton>
          <DeleteOutlineIcon />
        </IconButton>
        <IconButton
          // @ts-ignore: Unreachable code error
          sx={{ color: !editable && '#b05217' }}
          onClick={() => {
            setEditable(!editable);
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            setClicked(!clicked);
          }}
        >
          {clicked ? <ArrowDownwardIcon /> : <ArrowForwardIcon />}
        </IconButton>
      </Card>
      {clicked ? (
        <Droppable
          droppableId={nameTest}
          type={nameTest}
          direction="horizontal"
        >
          {(provided) => (
            <ul
              className="listOfNPC"
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ display: snapshot.isDraggingOver && 'none' }}
            >
              {data.map((file: any, i: number) => {
                if (file.type === 'NPC')
                  return (
                    <Draggable key={file.id} draggableId={file.id} index={i}>
                      {(provided) => (
                        <ListCardNPC
                          name={file.data.name}
                          provided={provided}
                          // snapshot={snapshot}
                        />
                      )}
                    </Draggable>
                  );
              })}

              <AddNPCButton />
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      ) : null}
    </>
  );
};

export default ListCardFolder;
