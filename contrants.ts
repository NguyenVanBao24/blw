export const formatKey = (key: string) => {
  const keyMap: { [key: string]: string } = {
    name: 'Tên',
    age: 'Tuổi',
    hometown: 'Quê Quán',
  };
  return keyMap[key] || key;
};
