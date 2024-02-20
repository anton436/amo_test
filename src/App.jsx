import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination, Spinner } from 'react-bootstrap';
import PageSizeSelector from './src/components/PageSizeSelector';
import DealsTable from './src/components/DealsTable';
import { ACCESS_TOKEN } from './src/helpers/consts';
import SortSelector from './src/components/SortSelector';

function App() {
  const [deals, setDeals] = useState([]);
  const [pageSize, setPageSize] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortValue, setSortValue] = useState(0);

  useEffect(() => {
    fetchData();
  }, [pageSize, currentPage]);

  const fetchData = async () => {
    try {
      setLoading(true);

      if (!pageSize) {
        let allDeals = [];
        let page = 1;

        while (true) {
          const response = await axios.get(
            'https://corsproxy.io/?' +
              `https://antonshe436.amocrm.ru/api/v4/leads?page=${page}&limit=5`,
            {
              headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
            }
          );

          if (response.status === 204) {
            break;
          }
          allDeals = [...allDeals, ...response.data._embedded.leads];

          page++;

          await new Promise((resolve) => setTimeout(resolve, 500));
        }

        setDeals(allDeals);
      } else {
        const response = await axios.get(
          'https://corsproxy.io/?' +
            `https://antonshe436.amocrm.ru/api/v4/leads?page=${currentPage}&limit=${pageSize}`,
          {
            headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
          }
        );
        setDeals(response.data._embedded.leads);
      }
    } catch (error) {
      console.error('Error fetching deals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePageSize = (size) => {
    setPageSize(size);
  };

  const handleChangeSortValue = (sortParam) => {
    setSortValue(sortParam);
  };

  return (
    <div className="container">
      <h1>Сделки amoCRM</h1>

      <div className="d-flex mb-5">
        <PageSizeSelector
          onChangePageSize={handleChangePageSize}
          setCurrentPage={setCurrentPage}
        />
        <SortSelector onChangeSortValue={handleChangeSortValue} />
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <DealsTable deals={deals} setDeals={setDeals} sortValue={sortValue} />
          {pageSize && (
            <Pagination className="justify-content-center">
              <Pagination.Prev
                disabled={currentPage <= 1 ? true : false}
                onClick={() => setCurrentPage(currentPage - 1)}
              />
              <Pagination.Next
                disabled={deals.length < pageSize ? true : false}
                onClick={() => setCurrentPage(currentPage + 1)}
              />
            </Pagination>
          )}
        </>
      )}
    </div>
  );
}

export default App;
