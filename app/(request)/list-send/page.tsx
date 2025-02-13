'use client';
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogContent } from '@mui/material';
import Image from 'next/image';
import { useAppContext } from '@/app/context/AppContext';
import Loading from '@/components/Loading';

export default function RequestTable() {
  const [data, setData] = useState([]);
  const { employeeId } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch('https://bup-be.vercel.app/api/get-send-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employeeId,
        }),
      });
      const data = await response.json();
      setData(data.data.rows);
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
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Employee ID</TableCell>
                <TableCell>Request Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row[1]}</TableCell>
                    <TableCell>{row[3]}</TableCell>
                    <TableCell>
                      <Image
                        src={row[4]}
                        width={100}
                        height={100}
                        alt='Request Image'
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleClickOpen(row[4])}
                      />
                    </TableCell>
                    <TableCell>{row[5] == false ? 'Chờ phê duyệt' : 'Đã phê duyệt'}</TableCell>
                    <TableCell>{row[6]}</TableCell>
                  </TableRow>
                ))}
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
    </>
  );
}
