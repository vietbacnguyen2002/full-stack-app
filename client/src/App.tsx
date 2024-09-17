import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

interface Customer {
  id: number;
  name: string;
  age: number;
}

const columns = [
  { id: "id", label: "ID", minWidth: 100 },
  { id: "name", label: "Name", minWidth: 100 },
  { id: "age", label: "Age", minWidth: 100 },
];
// interface Customer{
//   name:string;
//   age:number;
// }

function App() {
  const [customs, setCustoms] = useState<Customer[]>([]);
  const [customer, setCustomer] = useState({ name: "", age: 0 });
  useEffect(() => {
    fetch("http://localhost:8080/api/v1/customers")
      .then((res) => res.json())
      .then((data) => {
        setCustoms(data);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     fetch("http://localhost:8080/api/v1/customers", {
      method: "POST",
      body: JSON.stringify(customer),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCustomer({ name: "", age: 0 });
        setCustoms([...customs, data]);
      });
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {customs.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.id}</TableCell>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.age}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* add form create new customer*/}
      <Stack
        component="form"
        spacing={2}
        noValidate
        mt={2}
        onSubmit={handleSubmit}
      >
        <TextField
          placeholder="Enter name customer"
          value={customer.name}
          onChange={handleChange}
          name="name"
        ></TextField>
        <TextField
          placeholder="Enter age customer"
          name="age"
          value={customer.age}
          onChange={handleChange}
        ></TextField>
        <Button type="submit" variant="outlined">
          Create
        </Button>
      </Stack>
    </>
  );
}

export default App;
