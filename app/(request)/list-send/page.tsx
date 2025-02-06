'use client';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Checkbox, FormControlLabel } from '@mui/material';
import Image from 'next/image';

type RowData = {
  name: string;
  employeeId: string;
  requestType: string;
  requestDescription: string;
  imageUrl?: string; // Trường ảnh, có thể có hoặc không
};

const data: RowData[] = [
  { name: 'John Doe', employeeId: 'E123', requestType: 'Leave', requestDescription: 'Vacation', imageUrl: '/path/to/image.jpg' },
  { name: 'Jane Smith', employeeId: 'E124', requestType: 'Maintenance', requestDescription: 'Broken computer' },
  { name: 'Alex Johnson', employeeId: 'E125', requestType: 'Other', requestDescription: 'Request for new chair', imageUrl: '/path/to/image2.jpg' },
  { name: 'Maria Brown', employeeId: 'E126', requestType: 'Leave', requestDescription: 'Sick leave' },
  { name: 'David Wilson', employeeId: 'E127', requestType: 'Maintenance', requestDescription: 'Server issue', imageUrl: '/path/to/image3.jpg' },
];

export default function RequestTable() {
  const [showImage, setShowImage] = useState<boolean>(false);

  const handleToggleImage = () => {
    setShowImage(!showImage); // Chuyển đổi giữa hiển thị và ẩn hình ảnh
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Employee ID</TableCell>
              <TableCell>Request Type</TableCell>
              <TableCell>Request Description</TableCell>
              {showImage && <TableCell>Image</TableCell>} {/* Hiển thị cột Image khi toggle */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.employeeId}</TableCell>
                <TableCell>{row.requestType}</TableCell>
                <TableCell>{row.requestDescription}</TableCell>
                {showImage && row.imageUrl && (
                  <TableCell>
                    <Image
                      src={row.imageUrl}
                      alt='Uploaded Image'
                      width={100}
                      height={100}
                      style={{ objectFit: 'cover' }}
                    />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <FormControlLabel
        control={
          <Checkbox
            checked={showImage}
            onChange={handleToggleImage}
          />
        }
        label='Show Image'
      />
    </Paper>
  );
}
