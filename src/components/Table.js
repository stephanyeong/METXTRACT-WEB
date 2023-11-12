import * as React from 'react';
import { styled } from '@mui/system';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../firebase'; 
import { useEffect, useState } from 'react';
import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';

export default function TableUnstyled() {

    const [dataSet, setDataSet] = useState([]);

    async function fetchDataFromPdfList() {
        const db = getFirestore(app);
        const pdfListRef = collection(db, 'pdfList');

        try {
            const querySnapshot = await getDocs(pdfListRef);
            const newData = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                newData.push(data);
            });
            setDataSet(newData);
        } catch (error) {
            console.error('Error getting documents: ', error);
        }
    }

    useEffect(() => {
        fetchDataFromPdfList();
    }, []);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleButtonClick = (data) => {
        alert(`Button clicked for ${data.title}`);
    };


    return (
        <Root>
            <table className="table_list" aria-label="custom pagination table">
                <thead>
                    <tr>
                        <th className='title-cell'>Title</th>
                        <th>File</th>
                        <th>Authors</th>
                        <th>Publication Date</th>
                    </tr>
                </thead>
                <tbody>
                    {(rowsPerPage > 0
                        ? dataSet.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : dataSet
                    ).map((data, index) => (
                        <tr key={index}>
                            <td>{data.title}</td>
                            <td>
                                <button onClick={() => handleButtonClick(data)}>Button</button>
                            </td>
                            <td>{data.authors}</td>
                            <td>{data.publicationDate}</td>
                        </tr>
                    ))}
                    {emptyRows > 0 && (
                        <tr style={{ height: 41 * emptyRows }}>
                            <td colSpan={4} aria-hidden />
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <CustomTablePagination
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        colSpan={4}
                        count={dataSet.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        slotProps={{
                            select: {
                            'aria-label': 'rows per page',
                            },
                            actions: {
                            showFirstButton: true,
                            showLastButton: true,
                            },
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </tr>
                </tfoot>
            </table>
        </Root>
    );
}

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  // createData('Cupcake', 305, 3.7),
  // createData('Donut', 452, 25.0),
  // createData('Eclair', 262, 16.0),
  // createData('Frozen yoghurt', 159, 6.0),
  // createData('Gingerbread', 356, 16.0),
  // createData('Honeycomb', 408, 3.2),
  // createData('Ice cream sandwich', 237, 9.0),
  // createData('Jelly Bean', 375, 0.0),
  // createData('KitKat', 518, 26.0),
  // createData('Lollipop', 392, 0.2),
  // createData('Marshmallow', 318, 0),
  // createData('Nougat', 360, 19.0),
  // createData('Oreo', 437, 18.0),
]

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Root = styled('div')(
  ({ theme }) => `
  .table_list {
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    width: 100%;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    box-shadow: 0px 2px 16px ${
      theme.palette.mode === 'dark' ? grey[900] : grey[200]
    };
    border-radius: 12px;
    overflow: hidden;
    // border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
  }

  td,
  th {
    // border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  }
  `,
);

const CustomTablePagination = styled(TablePagination)`
  & .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    border-radius: 50px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
  }
`;