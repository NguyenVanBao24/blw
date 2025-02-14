'use client';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { useAppContext } from '@/app/context/AppContext';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import { RestInfo, RestInfoRequest } from '@/types/api';
import { restInfo } from '@/services/user';

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
  const { name } = useAppContext();
  const [employee, setEmployee] = useState<RestInfo | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const requestData: RestInfoRequest = { name };
      const response = await restInfo(requestData);
      setEmployee(response.data);
      setLoading(false);
    };

    fetchData();
  }, [name]);

  if (loading) {
    return <Loading />;
  }

  console.log(name, '123name');
  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 400, margin: 'auto', mt: 3 }}
    >
      <Table>
        <TableBody>
          {employee &&
            Object.entries(employee).map(([key, value]) => (
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
