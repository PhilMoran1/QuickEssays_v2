import ReactPaginate from 'react-paginate';
import { useState } from 'react';
import { Box } from '@chakra-ui/react';

const PAGE_SIZE = 10;

function Pages(props) {
  const [currentPage, setCurrentPage] = useState(0);
  //   const pages = createPages(); // Assuming this returns an array of page content
  const PAGE_HEIGHT = "30cm";
  const PAGE_WIDTH = "21cm";


  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected);
  }

  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const displayedPages = props.pages.slice(start, end);

  return (
    <div>
      {displayedPages.map((pageContent, index) => (
        <Box
          key={index}
          className="page"
          minH={PAGE_HEIGHT}
          width={PAGE_WIDTH}
          marginLeft="10%"
          marginRight="5%"
          overflow="hidden"
          mb="2"
          backgroundColor="white"
          boxShadow="lg"
        >
          <Box p="4" dangerouslySetInnerHTML={{ __html: pageContent }} />
        </Box>
      ))}

      <ReactPaginate
        pageCount={Math.ceil(props.pages.length / PAGE_SIZE)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
}

export default Pages;
