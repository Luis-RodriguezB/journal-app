import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DeleteOutline,
  SaveOutlined,
  UploadOutlined,
} from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components';
import { useForm } from '../../hooks';
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from '../../store';
import Swal from 'sweetalert2';

import 'sweetalert2/dist/sweetalert2.css';

export const NoteView = () => {
  const { active: activeNote } = useSelector((state) => state.journal);
  const dispatch = useDispatch();
  const { messageSaved, isSaving } = useSelector((state) => state.journal);
  const { title, body, date, formState, onInputChange } = useForm(activeNote);
  const fileInputRef = useRef();

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return new Intl.DateTimeFormat('en-US').format(newDate);
  }, [date]);

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Nota actualizada', messageSaved, 'success');
    }
  }, [messageSaved]);

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;
    dispatch(startUploadingFiles(target.files));
  };

  const onDelete = () => {
    dispatch( startDeletingNote() );
  };

  return (
    <Grid
      container
      direction='row'
      justifyContent='space-between'
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight='light'>
          {dateString}
        </Typography>
      </Grid>

      <input
        type='file'
        multiple
        onChange={onFileInputChange}
        accept='image/png, image/gif, image/jpeg'
        style={{ display: 'none' }}
        ref={fileInputRef}
      />

      <Grid item>
        <IconButton
          color='primary'
          disabled={isSaving}
          onClick={() => fileInputRef.current.click()}
        >
          <UploadOutlined />
        </IconButton>

        <Button
          color='primary'
          sx={{ padding: 2 }}
          onClick={onSaveNote}
          disabled={isSaving}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type='text'
          variant='filled'
          fullWidth
          placeholder='Ingrese su título'
          label='Título'
          name='title'
          value={title}
          onChange={onInputChange}
          sx={{ border: 'none', mb: 1 }}
        />

        <TextField
          type='text'
          variant='filled'
          fullWidth
          multiline
          placeholder='¿Qué sucedió hoy?'
          name='body'
          value={body}
          onChange={onInputChange}
          minRows={5}
          sx={{ border: 'none', mb: 1 }}
        />
      </Grid>

      <Grid container justifyContent='end'>
        <Button onClick={onDelete} sx={{ mt: 2 }} color='error'>
          <DeleteOutline />
        </Button>
      </Grid>

      <ImageGallery images={activeNote.imageUrls} />
    </Grid>
  );
};
