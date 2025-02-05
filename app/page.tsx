import UseInformation from '@/components/UseInformation';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

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

  return <UseInformation />;
}
