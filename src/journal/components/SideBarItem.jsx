import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { TurnedInNot } from '@mui/icons-material';
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { setActiveNote } from '../../store';

export const SideBarItem = ({ note }) => {
  const dispatch = useDispatch();
  const { title = '', body } = note;

  const newTitle = useMemo(() => {
    return title.length > 17 ? title.substring(0, 17) + '...' : title;
  }, [title]);

  const onSelectNote = () => {
    dispatch(setActiveNote({ ...note }));
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onSelectNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
