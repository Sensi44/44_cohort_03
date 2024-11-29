import AddPhotoIcon from '@mui/icons-material/AddAPhoto';
import PortraitIcon from '@mui/icons-material/Portrait';
import { Avatar, Badge, Button, styled } from '@mui/material';

import { BASE_URL } from '@Constants';
import type { IProfileAvatarProps } from './ProfileAvatar.props';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const ProfileAvatar = ({
  avatarUrl,
  whenChangeAvatar,
}: IProfileAvatarProps) => {
  return (
    <Badge
      overlap='circular'
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      badgeContent={
        <Button
          size='small'
          component='label'
          sx={{
            width: 60,
            height: 60,
            borderRadius: 50,
            backgroundColor: 'white',
          }}>
          <AddPhotoIcon />
          <VisuallyHiddenInput
            type='file'
            accept='.jpeg, .jpg, .png, .gif'
            onChange={(event: InputEvent) =>
              whenChangeAvatar((event.target as HTMLInputElement).files?.[0])
            }
          />
        </Button>
      }>
      {avatarUrl ? (
        <Avatar
          alt='avatar'
          sx={{ width: 160, height: 160 }}
          src={`${BASE_URL}/Resources/${avatarUrl}`}
        />
      ) : (
        <Avatar sx={{ width: 160, height: 160 }}>
          <PortraitIcon sx={{ fontSize: 60 }} />
        </Avatar>
      )}
    </Badge>
  );
};
