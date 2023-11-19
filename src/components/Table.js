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
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedYears, setSelectedYears] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
      setFilteredData(newData); 
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
  }

  useEffect(() => {
    fetchDataFromPdfList();
  }, []);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length) : 0;

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

  const handleSearchChange = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = dataSet.filter(
      (data) =>
        data.title.toLowerCase().includes(term) ||
        data.authors.toLowerCase().includes(term) ||
        data.publicationDate.toLowerCase().includes(term)
    );

    setFilteredData(filtered);
    setPage(0); 
  };

  const handleYearChange = (event) => {
    const year = parseInt(event.target.value, 10);
    const updatedSelectedYears = event.target.checked
      ? [...selectedYears, year]
      : selectedYears.filter((selectedYear) => selectedYear !== year);
    setSelectedYears(updatedSelectedYears);
  
    const filtered = dataSet.filter(
      (data) =>
        data.title.toLowerCase().includes(searchTerm) &&
        (updatedSelectedYears.length === 0 ||
          updatedSelectedYears.includes(new Date(data.publicationDate).getFullYear()))
    );
  
    setFilteredData(filtered);
    setPage(0);
  };
  

  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (isFilterOpen && !event.target.closest('.dropdown')) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isFilterOpen]);

  return (
    <Root>
      <div className="search-bar">
        <div className="search-input">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="dropdown" onClick={handleFilterToggle}>
          <label>Select Year</label>
          {isFilterOpen && (
            <div className="filter-options">
              {Array.from({ length: 14 }, (_, index) => 2010 + index).map(
                (year) => (
                  <div key={year}>
                    <input
                      type="checkbox"
                      id={year}
                      value={year}
                      checked={selectedYears.includes(year)}
                      onChange={handleYearChange}
                    />
                    <label htmlFor={year}>{year}</label>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
      <table className="table_list" aria-label="custom pagination table">
        <thead>
          <tr>
            <th className="title-cell">Title</th>
            <th className="title-cell">File</th>
            <th className="title-cell">Authors</th>
            <th className="title-cell">Publication Date</th>
          </tr>
        </thead>
        <tbody>
          {(rowsPerPage > 0
            ? filteredData.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : filteredData
          ).map((data, index) => (
            <tr key={index}>
              <td className="title-text">{data.title}</td>
              <td>
                <button
                  className="main-button"
                  onClick={() => handleButtonClick(data.pdfDownloadUrl)}
                >
                  <img
                    className="pdf-button"
                    src="/images/pdf.png"
                    alt="PDF button"
                  />
                </button>
              </td>
              <td className="author-text">{data.authors}</td>
              <td className="publication-text">{data.publicationDate}</td>
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
              count={filteredData.length}
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
  @media (max-width: 768px) {
    overflow-x: auto;
    display: block;
    width: 100%;

    .table_list {
    font-size: 0.6rem;
    }
    .pdf-button{
      height: 25px;
    }
    .title-cell{
      border-radius: 12px;
      height: 40px;
      font-size: 0.7rem;
      color: var(--foreground);
    }
    td,
  th {
    text-align: left;
    padding: 10px 15px;
    // border-bottom: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[300]};
    border-bottom: 2px solid var(--gbackground);
  }
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
