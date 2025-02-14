'use client';

import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogContent } from '@mui/material';
import Image from 'next/image';
import { useAppContext } from '@/app/context/AppContext';
import Loading from '@/components/Loading';
import { listSendRequestEmployee } from '@/services/request';
import { ListSendRequestRequest, SendRequestRequest } from '@/types/api';

export default function RequestTable() {
  const [data, setData] = useState<string[][]>([]);
  const { employeeId } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const requestBody: ListSendRequestRequest = { employeeId };
      const response = await listSendRequestEmployee(requestBody);

      if (response?.success) {
        setData(response.data as []);
      }
      setLoading(false);
    };

    fetchData();
  }, [employeeId]);

  if (loading) {
    return <Loading />;
  }

  const handleClickOpen = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage('');
  };

  return (
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
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => {
              const request: SendRequestRequest = {
                employeeId: row[0], // ID nhân viên
                TypeRequest: row[1], // Loại yêu cầu
                Request: row[5] === 'FALSE' ? 'Chờ phê duyệt' : 'Đã phê duyệt', // Trạng thái
                Image: row[4] || '', // URL hình ảnh (nếu có)
                name: row[6], // Thời gian gửi yêu cầu
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
                      <div>__</div>
                    )}
                  </TableCell>
                  <TableCell>{request.Request}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

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
    </Paper>
  );
}
