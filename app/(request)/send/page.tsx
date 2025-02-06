'use client';
import { useState } from 'react';
import { TextField, MenuItem, Select, FormControl, InputLabel, Button, Box, Typography, Checkbox, FormControlLabel } from '@mui/material';
import Image from 'next/image';
import { useAppContext } from '@/app/context/AppContext';

export default function RequestForm() {
  const { name, employeeId, setUserLogIn, setUserInfo } = useAppContext();

  const [employeeName, setEmployeeName] = useState(name);
  const [employeeIdRequest, setEmployeeIdRequest] = useState(employeeId);
  const [requestType, setRequestType] = useState('');
  const [requestDescription, setRequestDescription] = useState('');
  const [hasImage, setHasImage] = useState(false);
  const [image, setImage] = useState<string | null>(null); // ✅ Fix kiểu dữ liệu

  console.log(name, employeeId);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Submitting form:', { employeeName, employeeIdRequest, requestType, requestDescription, hasImage, image });

    try {
      const response = await fetch('http://localhost:3001/api/post-send-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: employeeName,
          employeeId: employeeIdRequest,
        }),
      });

      const data = await response.json();
      console.log('Đăng nhập thành công:', data.status);
    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setImage(URL.createObjectURL(file));
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
          value={employeeIdRequest}
          onChange={(e) => setEmployeeIdRequest(e.target.value)}
          required
          sx={{ mb: 2 }}
          disabled
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
            <MenuItem value='Leave'>Xin chấm công</MenuItem>
            <MenuItem value='Maintenance'>Xin đi trễ / về sớm</MenuItem>
            <MenuItem value='Other'>Khác...</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label='Request Description'
          multiline
          rows={4}
          fullWidth
          value={requestDescription}
          onChange={(e) => setRequestDescription(e.target.value)}
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
