import { useState } from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react'
import DevelopmentTable from 'views/admin/dataTables/components/DevelopmentTable'
import CheckTable from 'views/admin/dataTables/components/CheckTable'
import ColumnsTable from 'views/admin/dataTables/components/ColumnsTable'
import ComplexTable from 'views/admin/dataTables/components/ComplexTable'
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex
} from 'views/admin/dataTables/variables/columnsData'
import tableDataDevelopment from 'views/admin/dataTables/variables/tableDataDevelopment.json'
import tableDataCheck from 'views/admin/dataTables/variables/tableDataCheck.json'
import tableDataColumns from 'views/admin/dataTables/variables/tableDataColumns.json'
import tableDataComplex from 'views/admin/dataTables/variables/tableDataComplex.json'
import React from 'react'
import AdminLayout from 'layouts/admin'
import { TableData } from 'views/admin/default/variables/columnsData'
import StreamrClient from 'streamr-client';
import { useEffect } from 'react';


export default function DataTables () {
  const [developmentData, setDevelopmentData] = useState([]);

  const handleDevelopmentMessage = (msg : any) => {
    setDevelopmentData(msg);
    console.log(msg,"msg");
  }

  useEffect(() => {
    async function subscribeToStreamr() {
      if(window.ethereum){
        const client = new StreamrClient({
          auth: {
            ethereum: window.ethereum 
          }
        });
        const subscription = await client.subscribe(
          '0x0439427c42a099e7e362d86e2bbe1ea27300f6cb/kamalthedev',
          handleDevelopmentMessage
        );
      }
    }
    
    subscribeToStreamr();
  }, []);
  

  // streamr.subscribe('0x0439427c42a099e7e362d86e2bbe1ea27300f6cb/kamalthedev', handleDevelopmentMessage);

  return (
    <AdminLayout>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <SimpleGrid
          mb='20px'
          columns={{ sm: 1, md: 2 }}
          spacing={{ base: '20px', xl: '20px' }}
        >
          <DevelopmentTable
            columnsData={columnsDataDevelopment}
            tableData={developmentData}
          />
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={(tableDataCheck as unknown) as TableData[]}
          />
          <ColumnsTable
            columnsData={columnsDataColumns}
            tableData={(tableDataColumns as unknown) as TableData[]}
          />
          <ComplexTable
            columnsData={columnsDataComplex}
            tableData={(tableDataComplex as unknown) as TableData[]}
          />
        </SimpleGrid>
      </Box>
    </AdminLayout>
  )
}
