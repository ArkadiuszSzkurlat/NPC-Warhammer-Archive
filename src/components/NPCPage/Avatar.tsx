import { IconButton, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import AvatarImg from '../../resources/images/face.jpg';
import { NPCArchetype } from '../../types/types';
import { Box } from '@mui/system';
import { getAllAvatars } from '../../firebase';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';

const Avatar = ({
  editable,
  NPC,
  handleSingleItemChange,
}: {
  editable: boolean;
  NPC: NPCArchetype;
  handleSingleItemChange: (inputValue: string, type: string) => Promise<void>;
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [avatarsURL, setAvatarsURL] = useState<string[]>([]);
  const handleOpen = () => {
    setOpenModal(true);
    if (avatarsURL.length !== 0) return;
    arrOfImages();
  };
  const handleClose = () => setOpenModal(false);

  const arrOfImages = async () => {
    await getAllAvatars()
      .then((res) => {
        setAvatarsURL(res);
        return null;
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="npc-top-avatar">
      {editable && (
        <IconButton id="npc-top-avatar-iconButton" onClick={handleOpen}>
          <ImageSearchIcon style={{ fontSize: 42, color: 'white' }} />
        </IconButton>
      )}
      <img
        src={NPC.avatarURL ? NPC.avatarURL : AvatarImg}
        className="npc-top-avatar-img"
        alt="avatar"
      />
      <input
        className="npc-top-avatar-nickname"
        type="text"
        value={NPC.name}
        disabled={!editable}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleSingleItemChange(e.target.value, 'name');
        }}
      />
      <Modal open={openModal} onClose={handleClose}>
        <Box id="chooseAvatar-modal">
          <IconButton id="chooseAvatar-modal-iconButton" onClick={handleClose}>
            <CloseIcon style={{ fontSize: 42 }} />
          </IconButton>{' '}
          {avatarsURL.length <= 0 ? (
            <Box id="chooseAvatar-progress-circle-box">
              <CircularProgress id="chooseAvatar-progress-circle" size={100} />
            </Box>
          ) : null}
          {avatarsURL &&
            avatarsURL.map((URL, i) => {
              return (
                <img
                  key={i}
                  src={URL}
                  className="chooseAvatar-modal-avatar"
                  onClick={() => {
                    handleSingleItemChange(URL, 'avatarURL');
                  }}
                />
              );
            })}
        </Box>
      </Modal>
    </div>
  );
};

export default Avatar;
