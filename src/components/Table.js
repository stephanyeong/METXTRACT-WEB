import * as React from 'react';
import { styled } from '@mui/system';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { app } from '../firebase';
import { useEffect, useState } from 'react';
import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import '../styles/Table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';


export default function TableUnstyled() {
  const [dataSet, setDataSet] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [adviserSearchTerm, setAdviserSearchTerm] = useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedYears, setSelectedYears] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isMoreModalOpen, setIsMoreModalOpen] = useState(false);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState('');
  const [adviserData, setAdviserData] = useState('');
  const [isTrue, setIsTrue] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const token = localStorage.getItem("token-uid");

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

  async function fetchDataFromAdvisers() {
    const db = getFirestore(app);
    const advisersRef = collection(db, 'advisers');
  
    try {
      const querySnapshot = await getDocs(query(advisersRef, where('uid', '==', token)));
      const doc = querySnapshot.docs[0]; 
  
      if (doc) {
        const data = doc.data();
        const adviserData = data.fullName;
  
        setAdviserData(adviserData);
        console.log(adviserData);
      } else {
        console.log('No matching document found');
      }
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
  }
  
  useEffect(() => {
    fetchDataFromAdvisers();
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
  const openMoreDialog = (title, authors, publicationDate, adviser, method, keywords, researchDesign, researchType) => {
    console.log("Clicked!");
    setSelectedData({
      title,
      authors,
      publicationDate,
      adviser,
      method,
      keywords,
      researchDesign,
      researchType,
    });
    setIsMoreModalOpen(true);
  }

  const closeMoreDialog = () => {
    setIsMoreModalOpen(false);

  }

  const MoreModal = ({
    isOpen,
    onClose,
    title,
    authors,
    publicationDate,
    adviser,
    method,
    keywords,
    researchDesign,
    researchType,
  }) => {
    return (
      <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h6" style={{ fontWeight: 'bold', color: '#048CB4' }}>
            More Details
          </Typography>
        </DialogTitle>
        <DialogContent>
          {/* Add your content here using the provided details */}
          <p>
            <span style={{ fontWeight: 'bold' }}>Title:</span> {title}
          </p>
          <p>
            <span style={{ fontWeight: 'bold' }}>Authors:</span> {authors}
          </p>
          <p>
            <span style={{ fontWeight: 'bold' }}>Publication Date:</span> {publicationDate}
          </p>
          <p>
            <span style={{ fontWeight: 'bold' }}>Adviser:</span> {adviser}
          </p>
          <p>
            <span style={{ fontWeight: 'bold' }}>Methodology:</span> {method}
          </p>
          <p>
            <span style={{ fontWeight: 'bold' }}>Keywords:</span> {keywords}
          </p>
          <p>
            <span style={{ fontWeight: 'bold' }}>Research Design:</span> {researchDesign}
          </p>
          <p>
            <span style={{ fontWeight: 'bold' }}>Research Type:</span> {researchType}
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  };


  const openPdfModal = (pdfDownloadUrl, adviser) => {
    console.log("adviser:", adviser);
    console.log("adviserData:", adviserData);
    setSelectedPdfUrl(pdfDownloadUrl);
    const adviserParts = adviser.split(' ');

    const containsAnyPart = adviserParts.some(part => adviserData.includes(part));
  
    console.log("Contains Any Part:", containsAnyPart);
  
    setIsTrue(containsAnyPart);
  
    if (containsAnyPart) {
      console.log("Values are true!");
    } else {
      console.log("Values are not true.");
    }
  
    setIsPdfModalOpen(true);
  };
  

  const closePdfModal = () => {
    setIsPdfModalOpen(false);
    setSelectedPdfUrl('');
  };

  const handleSearchChange = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = dataSet.filter(
      (data) =>
        data.title.toLowerCase().includes(term) ||
        data.authors.toLowerCase().includes(term) ||
        data.publicationDate.toLowerCase().includes(term) ||
        data.keywords.toLowerCase().includes(term) ||
        data.methodology.toLowerCase().includes(term) ||
        data.researchDesign.toLowerCase().includes(term) ||
        data.researchType.toLowerCase().includes(term)
    );

    setFilteredData(filtered);
    setPage(0); 
  };

  const handleAdviserSearchChange = (event) => {
    const term = event.target.value.toLowerCase();
    setAdviserSearchTerm(term);

    const filtered = dataSet.filter(
      (data) =>
        data.adviser.toLowerCase().includes(term)
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
  

  const handleFilterToggle = (event) => {
    event.preventDefault();
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
      <hr className="divider"/>
      <div className="search-bar">
        <div className="search-input">
          <FontAwesomeIcon  icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="search-input1">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search Adviser"
            value={adviserSearchTerm}
            onChange={handleAdviserSearchChange}
        />
      </div>
        <div className="dropdown" onClick={handleFilterToggle}>
          <div className="dropdown-labeltext">Select Year</div>
          {isFilterOpen && (
            <div className="filter-options">
              {Array.from({ length: 15 }, (_, index) => 2010 + index).map(
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
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ textAlign: 'center' }}>
                No Publications Found
              </td>
            </tr>
          ) : (
            (rowsPerPage > 0
              ? filteredData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filteredData
            ).map((data, index) => (
              <tr key={index}>
                <td className="title-text">
                  {data.title}{' '}
                  <p
                    style={{
                      textDecoration: 'underline',
                      color: 'blue',
                      display: 'inline',
                      cursor: 'pointer',
                    }}
                    onClick={() => openMoreDialog(data.title, data.authors, data.publicationDate, data.adviser, data.methodology, data.keywords, data.researchDesign, data.researchType,)}
                  >
                    more
                  </p>
                </td>
                <td>
                  <button
                    className="main-button"
                    onClick={() => {
                      openPdfModal(data.pdfDownloadUrl, data.adviser);
                    }}
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
            ))
          )}
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
      {token && isTrue ? 
      <Dialog open={isPdfModalOpen} onClose={closePdfModal} maxWidth="lg"
        fullWidth>
        <DialogTitle style={{ color: '#048CB4' }}>PDF Viewer</DialogTitle>
        <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <iframe
            src={selectedPdfUrl}
            style={{ width: '80%', height: '500px' }} 
            title="PDF Viewer"
          ></iframe>
        </DialogContent>
        <DialogActions>
          <Button onClick={closePdfModal}>Close</Button>
        </DialogActions>
      </Dialog> 
      : 
      <Dialog open={isPdfModalOpen} onClose={closePdfModal} maxWidth="lg"
        fullWidth>
        <DialogTitle style={{ color: '#048CB4' }}>PDF Viewer</DialogTitle>
        <DialogContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <iframe
            src={selectedPdfUrl +"#toolbar=0"}
            style={{ width: '80%', height: '500px' }} 
            title="PDF Viewer"
          ></iframe>
        </DialogContent>
        <DialogActions>
          <Button onClick={closePdfModal}>Close</Button>
        </DialogActions>
      </Dialog>}
      {selectedData && (
        <MoreModal
          isOpen={isMoreModalOpen}
          onClose={closeMoreDialog}
          {...selectedData}
        />
      )}
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
    background-color: var(--wbackground);
    box-shadow: 0px 2px 16px #E5EAF2;
    border-radius: 12px;
    height: 500px;
    width: 1130px;
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
  @media (max-width: 767px) {
    overflow-x: auto;
    display: block;
    width: 100%;

    .table_list {
    font-size: 0.6rem;
    width: 100%;
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
    padding: 5px 15px;
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

    @media (min-width: 767px) {
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
