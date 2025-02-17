'use client';

import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/app/context/AppContext';
import { Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogContent, Button } from '@mui/material';
import Image from 'next/image';
import { SelectChangeEvent } from '@mui/material';
import { listSendRequestAdmin } from '@/services/request';
import { InsertRequest, TimekeepingRequest } from '@/types/api';
import { insertAccept } from '@/services/admin';
import CustomModal from '@/components/CustomModal';
import { timekeepingInsert } from '@/services/timekeeping';
import Loading from '@/components/Loading';

const Accept = () => {
  const { phone } = useAppContext();
  const [data, setData] = useState<string[][] | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [statuses, setStatuses] = useState<{ [key: number]: string }>({});
  const [errorState, setErrorState] = useState({ state: false, text: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await listSendRequestAdmin();
      if (response?.success) {
        setData(response.data as []);
      }
    };

    fetchData();
  }, [phone]);

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

  const handleSaveAccept = async (employeeId: string, index: number, dayTimekeeping: string) => {
    setLoading(true);
    try {
      const value = statuses[index];
      const requestData: InsertRequest = { employeeId, value };

      const response = await insertAccept(requestData);

      const date = dayTimekeeping.toString().split('/')[0];

      if (response.success == true) {
        const requestData: TimekeepingRequest = { employeeId, dayTimekeeping: date, values: '9999' };

        const nextResponse = await timekeepingInsert(requestData);

        if (nextResponse.success == true) {
          setErrorState({ state: true, text: 'Gửi yêu cầu thành công' });
        } else {
          setErrorState({ state: true, text: 'Gửi yêu cầu thất bại' });
        }
      } else {
        setErrorState({ state: true, text: 'Gửi yêu cầu thất bại' });
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

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
                <TableCell>Mã nhân viên</TableCell>
                <TableCell>Tên</TableCell>
                <TableCell>Loại yêu cầu</TableCell>
                <TableCell>Ảnh</TableCell>
                <TableCell>Nội dung</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Ngày xin phép</TableCell>
                <TableCell>Thời gian gửi yêu cầu</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(data) &&
                data.map((row, index) => {
                  const request = {
                    employeeId: row[0],
                    TypeRequest: row[1],
                    name: row[2],
                    Request: row[3],
                    Image: row[4] || '',
                    DateTimekeeping: row[5],
                    ReplyRequest: row[6],
                    Timestamp: row[7],
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
                      <TableCell>{request.DateTimekeeping}</TableCell>
                      <TableCell>{request.Timestamp}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleSaveAccept(request.employeeId, index, request.DateTimekeeping)}
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
