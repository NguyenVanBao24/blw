import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';

export default function Home() {
  const employee = {
    name: 'Nguyễn Văn A',
    age: 30,
    hometown: 'Đà Nẵng',
  };

  const formatKey = (key: string) => {
    const keyMap: { [key: string]: string } = {
      name: 'Tên',
      age: 'Tuổi',
      hometown: 'Quê Quán',
    };
    return keyMap[key] || key;
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 400, margin: 'auto', mt: 3 }}
    >
      <Table>
        <TableBody>
          {Object.entries(employee).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell sx={{ fontWeight: 'bold', width: '30%' }}>{formatKey(key)}</TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
