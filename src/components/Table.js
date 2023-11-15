import * as React from 'react';
import { styled } from '@mui/system';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../firebase'; 
import { useEffect, useState } from 'react';
import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import '../styles/Table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataSet.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleButtonClick = (data) => {
      window.open(data, '_blank');
    };

    return (
        <Root>
          <div className="search-bar">
            <div className="search-input">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input type="text" placeholder="Search" />
            </div>
          <div className="dropdown">
            <select>
              <option value="" disabled selected>
                Publication Month
              </option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>
          </div>
            <table className="table_list" aria-label="custom pagination table">
                <thead>
                    <tr>
                        <th className='title-cell'>Title</th>
                        <th className='title-cell'>File</th>
                        <th className='title-cell'>Authors</th>
                        <th className='title-cell'>Publication Date</th>
                    </tr>
                </thead>
                <tbody>
                    {(rowsPerPage > 0
                        ? dataSet.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : dataSet
                    ).map((data, index) => (
                        <tr key={index}>
                            <td className='title-text'>{data.title}</td>
                            <td>
                                <button class="main-button" onClick={() => handleButtonClick(data.pdfDownloadUrl)}>
                                  <img class="pdf-button" src="/images/pdf.png" alt="PDF button" />
                                </button>
                            </td>
                            <td className='author-text'>{data.authors}</td>
                            <td className='publication-text'>{data.publicationDate}</td>
                        </tr>
                    ))}
                    {emptyRows > 0 && (
                        <tr style={{ height: 41 * emptyRows }}>
                            <td colSpan={4} aria-hidden />
                        </tr>
                    )}
                </tbody>
                <tfoot>
                <tr className="no-border">
                        <CustomTablePagination
                        rowsPerPageOptions={[3, 5, 10, 25, { label: 'All', value: -1 }]}
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
  .title-cell{
    border-radius: 12px;
    height: 40px;
    font-size: 0.95rem;
    color: var(--foreground);
  }
  .table_list {
    font-size: 0.875rem;
    width: 100%;
    background-color: var(--wbackground);
    box-shadow: 0px 2px 16px #E5EAF2;
    border-radius: 12px;
    height: 500px;
    overflow-y: auto;
    border-collapse: collapse;
  }
  .title-text{
    font-weight: 500;
  }
  .author-text{
    font-style: italic;
  }
  .pdf-button{
    height: 30px;
  }
  .main-button {
    background: none; 
    border: none;   
    padding: 0;   
    cursor: pointer;
  }
  
  td,
  th {
    text-align: left;
    padding: 15px 25px;
    // border-bottom: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[300]};
    border-bottom: 2px solid var(--gbackground);
  }

  th:last-child, td:last-child {
    width: 13%; /* Adjust the width as needed */
  }

  th {
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  }

  tfoot tr:last-child td {
    border-bottom: none; /* Remove the bottom border from the last row in the "tfoot" section */
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