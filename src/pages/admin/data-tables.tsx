import { useState, useEffect } from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react'
import DevelopmentTable from 'views/admin/dataTables/components/DevelopmentTable'
import CheckTable from 'views/admin/dataTables/components/CheckTable'
import {
  columnsDataDevelopment,
  columnsDataCheck,
} from 'views/admin/dataTables/variables/columnsData'
import tableDataDevelopment from 'views/admin/dataTables/variables/tableDataDevelopment.json'
import tableDataCheck from 'views/admin/dataTables/variables/tableDataCheck.json'
import React from 'react'
import AdminLayout from 'layouts/admin'
import { TableData } from 'views/admin/default/variables/columnsData'
import StreamrClient from 'streamr-client';
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

export default function DataTables() {
  const [developmentData, setDevelopmentData] = useState([]);
  const [city, setCity] = useState();
  const [price, setPrice] = useState();
  const [data, setData] = useState([]);

  const handleDevelopmentMessage = (msg: any) => {
    const { city, price } = msg;
    setData(prevData => [...prevData, msg]);
    console.log(city, "msg");
    setCity(msg.city);
    setPrice(msg.price);
  };

  useEffect(() => {
    async function subscribeToStreamr() {
      if (window.ethereum) {
        const client = new StreamrClient({
          auth: {
            ethereum: window.ethereum,
          },
        });
        const subscription = await client.subscribe(
          '0x0439427c42a099e7e362d86e2bbe1ea27300f6cb/kamalthedev',
          handleDevelopmentMessage
        );
      }
    }

    subscribeToStreamr();
  }, []);

  useEffect(() => {
    console.log(data, "msg");
  }, [data]);

  return (
    <AdminLayout>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <SimpleGrid
          mb='20px'
          columns={{ sm: 1, md: 2 }}
          spacing={{ base: '20px', xl: '20px' }}
        >
          
    <Table variant="simple">
          <Thead>
            <Tr>
              <Th>City</Th>
              <Th>Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {/* {data.map((msg, index) => (
              <Tr key={index}>
                <Td>{msg[index]?.city}</Td>
                <Td>{msg[index]?.price}</Td>
                <Td>{city}</Td>
              </Tr>
            ))} */}
            <Tr>
              <Td>{city}</Td>
              <Td>{price}</Td>
            </Tr>
          </Tbody>
        </Table>
          <DevelopmentTable
            columnsData={columnsDataDevelopment}
            tableData={(tableDataDevelopment as unknown) as TableData[]}
          />
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={(tableDataCheck as unknown) as TableData[]}
          />
        </SimpleGrid>
      </Box>
    </AdminLayout>
  );
}
