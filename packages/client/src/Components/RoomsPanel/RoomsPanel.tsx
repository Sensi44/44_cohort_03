import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
} from '@mui/material';
import { TRoomsPanelProps } from './RoomsPanel.props';

export const RoomsPanel = ({ rooms, setSelectedRoomId }: TRoomsPanelProps) => {
  return (
    <Box
      sx={{
        flex: 1,
        maxWidth: 300,
        borderRight: 1,
        borderColor: 'divider',
        maxHeight: '100vh',
        overflowY: 'auto',
      }}>
      <List
        subheader={
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'>
            <ListSubheader>Комнаты</ListSubheader>
            <AddCircleOutlineIcon sx={{ mr: 2, color: 'purple' }} />
          </Stack>
        }>
        {rooms?.map((room) => (
          <ListItemButton
            key={room.id}
            onClick={() => setSelectedRoomId(room.id)}>
            <ListItemText primary={room.name} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};
