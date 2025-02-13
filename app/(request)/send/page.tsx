'use client';
import { useState } from 'react';
import { TextField, MenuItem, Select, FormControl, InputLabel, Button, Box, Typography, Checkbox, FormControlLabel, fabClasses } from '@mui/material';
import Image from 'next/image';
import { useAppContext } from '@/app/context/AppContext';
import Loading from '@/components/Loading';
import { Calligraffitti } from 'next/font/google';

const optionData = ['Xin chấm công', 'Xin đi trễ / về sớm', 'Khác..'];

export default function RequestForm() {
  const { name, employeeId } = useAppContext();

  const [employeeName, setEmployeeName] = useState(name);
  const [employeeIdRequest, setEmployeeIdRequest] = useState(employeeId);
  const [requestType, setRequestType] = useState('');
  const [requestDescription, setRequestDescription] = useState('');
  const [hasImage, setHasImage] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Submitting form:', { employeeName, employeeIdRequest, requestType, requestDescription, hasImage, image });

    setLoading(true);

    try {
      const response = await fetch('https://bup-be.vercel.app/api/post-send-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: employeeName,
          employeeId: employeeIdRequest,
          TypeRequest: requestType,
          Request: requestDescription,
          Image: image,
        }),
      });

      const data = await response.json();
    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error);
    }

    setRequestType('');
    setRequestDescription('');
    setImage('');
    setLoading(false);
  };
  if (loading) {
    return <Loading />;
  }
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      setLoading(true);

      try {
        const response = await fetch('https://bup-be.vercel.app/api/post-email', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        if (data.imageUrl) {
          setImage(data.imageUrl);
        }
      } catch (error) {
        console.error('Lỗi khi upload ảnh lên Cloudinary:', error);
      }

      setLoading(false);
    }
  };
  console.log(image, 'imageimageimageimageimage');
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
            {optionData.map((els) => (
              <MenuItem
                key={els}
                value={els}
              >
                {els}
              </MenuItem>
            ))}
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
