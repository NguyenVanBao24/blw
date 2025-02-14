'use client';

import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/app/context/AppContext';
import { Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogContent, Button } from '@mui/material';
import Image from 'next/image';
import { SelectChangeEvent } from '@mui/material';
import { listSendRequestAdmin } from '@/services/request';
import { InsertRequest } from '@/types/api';
import { insertAccept } from '@/services/admin';
import CustomModal from '@/components/CustomModal';

const Accept = () => {
  const { phone } = useAppContext();
  const [data, setData] = useState<string[][] | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [statuses, setStatuses] = useState<{ [key: number]: string }>({});
  const [errorState, setErrorState] = useState({ state: false, text: '' });

  useEffect(() => {
    const fetchData = async () => {
      const response = await listSendRequestAdmin();

      if (response?.success) {
        setData(response.data as []);
      }
    };

    fetchData();
  }, []);

  const handleClose = () => {
    setOpen(false);
    setSelectedImage('');
  };

  const handleClickOpen = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setOpen(true);
  };

  const handleChange = (index: number) => (event: SelectChangeEvent<string>) => {
    if (!data) return;

    const newStatus = event.target.value;
    setStatuses((prev) => ({
      ...prev,
      [index]: newStatus,
    }));
  };

  const handleSaveAccept = async (requestId: string, index: number) => {
    const value = statuses[index];
    const requestData: InsertRequest = { requestId, value };
    console.log(requestId, value, 'employeeId, valueemployeeId, value');

    const response = await insertAccept(requestData);
    console.log(requestId, value, 'employeeId, valueemployeeId, value');

    if (response.success == true) {
      setErrorState({ state: true, text: 'Gửi yêu cầu thành công' });
    } else {
      setErrorState({ state: true, text: 'Gửi yêu cầu thất bại' });
    }
  };

  if (phone !== '0708034532') {
    return <div>Bạn không được cấp quyền truy cập</div>;
  }

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Request Type</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Reply Status</TableCell>
                <TableCell>Timestamp</TableCell>
                <TableCell>Save</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(data) &&
                data.map((row, index) => {
                  const request = {
                    employeeId: row[0], // ID nhân viên
                    TypeRequest: row[1], // Loại yêu cầu
                    name: row[2],
                    Request: row[3],
                    Image: row[4] || '', // URL hình ảnh (nếu có)
                    ReplyRequest: row[5] === 'FALSE' ? 'Chờ phê duyệt' : 'Đã phê duyệt', // Trạng thái
                    Timestamp: row[6],
                  };

                  return (
                    <TableRow key={index}>
                      <TableCell>{request.employeeId}</TableCell>
                      <TableCell>{request.name}</TableCell>
                      <TableCell>{request.TypeRequest}</TableCell>
                      <TableCell>
                        {request.Image ? (
                          <Image
                            src={request.Image}
                            width={100}
                            height={100}
                            alt='Request Image'
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleClickOpen(request.Image)}
                          />
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell>{request.Request}</TableCell>
                      <TableCell>
                        <Select
                          value={statuses[index] || 'Chờ phê duyệt'}
                          onChange={handleChange(index)}
                          size='small'
                        >
                          <MenuItem value='Chờ phê duyệt'>Chờ phê duyệt</MenuItem>
                          <MenuItem value='Đã phê duyệt'>Đã phê duyệt</MenuItem>
                        </Select>
                      </TableCell>

                      <TableCell>{request.Timestamp}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleSaveAccept(request.employeeId, index)}
                          variant='contained'
                        >
                          Lưu
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Dialog hiển thị hình ảnh */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth='lg'
      >
        <DialogContent>
          {selectedImage && (
            <Image
              src={selectedImage}
              width={800}
              height={800}
              alt='Full Screen Image'
            />
          )}
        </DialogContent>
      </Dialog>
      {errorState && (
        <CustomModal
          open={errorState.state}
          onClose={() => setErrorState({ state: false, text: '' })}
          text={errorState.text}
        />
      )}
    </>
  );
};

export default Accept;
