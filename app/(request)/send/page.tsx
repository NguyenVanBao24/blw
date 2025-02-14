'use client';
import { useState } from 'react';
import { TextField, MenuItem, Select, FormControl, InputLabel, Button, Box, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { useAppContext } from '@/app/context/AppContext';
import Loading from '@/components/Loading';
import CustomModal from '@/components/CustomModal';
import { SendImageRequest, SendRequestRequest } from '@/types/api';
import { sendImage, sendRequest } from '@/services/request';

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
  const [file, setFile] = useState<File | null>(null);
  const [errorState, setErrorState] = useState({ state: false, text: '' });
  console.log(image);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      let imageUrl = '';

      if (file) {
        const formData: SendImageRequest = new FormData();
        formData.append('image', file);

        console.log(file);
        console.log([...formData.entries()]);

        const response = await sendImage(formData);

        if (response.success) {
          imageUrl = response.data?.image || '';
          if (imageUrl == '') {
            console.log(imageUrl, 'imageUrlimageUrlimageUrl');
            return setErrorState({ state: true, text: 'Gửi yêu cầu thất bại' });
          }
          setImage(imageUrl);
        }
      }

      const requestBody: SendRequestRequest = {
        name: employeeName,
        employeeId: employeeIdRequest,
        TypeRequest: requestType,
        Request: requestDescription,
        Image: imageUrl,
      };

      const response = await sendRequest(requestBody);

      if (response.success == true) {
        setErrorState({ state: true, text: 'Gửi yêu cầu thành công' });
      } else {
        setErrorState({ state: true, text: 'Gửi yêu cầu thất bại' });
      }
    } catch (error) {
      console.error('Lỗi khi gửi request:', error);
      setErrorState({ state: false, text: '' });
    }

    setRequestType('');
    setRequestDescription('');
    setImage(null);
    setFile(null);
    setLoading(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  if (loading) {
    return <Loading />;
  }

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
          disabled
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
            {optionData.map((option) => (
              <MenuItem
                key={option}
                value={option}
              >
                {option}
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
            {file && (
              <Box sx={{ mt: 2 }}>
                <Typography variant='body2'>Selected: {file.name}</Typography>
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

      {errorState && (
        <CustomModal
          open={errorState.state}
          onClose={() => setErrorState({ state: false, text: '' })}
          text={errorState.text}
        />
      )}
    </Box>
  );
}
