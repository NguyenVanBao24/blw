'use client';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { useAppContext } from '@/app/context/AppContext';
import { useEffect, useState } from 'react';

export default function Home() {
  const formatKeyRest = (key: string) => {
    const keyMap: { [key: string]: string } = {
      thang1: 'tháng 1',
      thang2: 'tháng 2',
      thang3: 'tháng 3',
      thang4: 'tháng 4',
      thang5: 'tháng 5',
      thang6: 'tháng 6',
      thang7: 'tháng 7',
      thang8: 'tháng 7',
      thang9: 'tháng 7',
      thang10: 'tháng 7',
      thang11: 'tháng 7',
      thang12: 'tháng 7',
    };
    return keyMap[key] || key;
  };
  const { phone } = useAppContext();
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/find-rest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          //   body: JSON.stringify({ phone }),
          body: JSON.stringify({ name: 'phan đình mẫn' }),
        });

        if (!response.ok) {
          throw new Error(`Lỗi: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setEmployee(data.data);
        console.log('Kết quả API:', data.data);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    };

    fetchData();
  }, [phone]);

  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 400, margin: 'auto', mt: 3 }}
    >
      <Table>
        <TableBody>
          {Object.entries(employee).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell sx={{ fontWeight: 'bold', width: '30%' }}>{formatKeyRest(key)}</TableCell>
              <TableCell>{String(value)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
