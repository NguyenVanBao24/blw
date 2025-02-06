'use client';
import { useState } from 'react';
import { TextField, MenuItem, Select, FormControl, InputLabel, Button, Box, Typography, Checkbox, FormControlLabel } from '@mui/material';
import Image from 'next/image';

export default function RequestForm() {
  const [employeeName, setEmployeeName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [requestType, setRequestType] = useState('');
  const [requestDescription, setRequestDescription] = useState('');
  const [hasImage, setHasImage] = useState(false);
  const [image, setImage] = useState<string | null>(null); // ✅ Fix kiểu dữ liệu

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Submitting form:', { employeeName, employeeId, requestType, requestDescription, hasImage, image });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setImage(URL.createObjectURL(file)); // Không lỗi nữa
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 3 }}>
      <Typography
        variant='h6'
        gutterBottom
      >
        Request Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label='Employee Name'
          fullWidth
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label='Employee ID'
          fullWidth
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <FormControl
          fullWidth
          required
          sx={{ mb: 2 }}
        >
          <InputLabel>Request Type</InputLabel>
          <Select
            value={requestType}
            onChange={(e) => setRequestType(e.target.value)}
          >
            <MenuItem value='Leave'>Leave</MenuItem>
            <MenuItem value='Maintenance'>Maintenance</MenuItem>
            <MenuItem value='Other'>Other</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label='Request Description'
          multiline
          rows={4}
          fullWidth
          value={requestDescription}
          onChange={(e) => setRequestDescription(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={hasImage}
              onChange={(e) => setHasImage(e.target.checked)}
            />
          }
          label='Attach Image'
        />
        {hasImage && (
          <Box sx={{ mt: 2 }}>
            <Button
              variant='outlined'
              component='label'
            >
              Upload Image
              <input
                type='file'
                hidden
                accept='image/*'
                onChange={handleImageChange}
              />
            </Button>
            {image && (
              <Box sx={{ mt: 2 }}>
                <Image
                  src={image}
                  alt='Uploaded'
                  width={200}
                  height={200}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </Box>
            )}
          </Box>
        )}
        <Box sx={{ mt: 2 }}>
          <Button
            type='submit'
            variant='contained'
            color='primary'
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}
