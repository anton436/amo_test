// DealsTable.js
import moment from 'moment';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Table } from 'react-bootstrap';

function DealsTable({ deals, sortValue }) {
  const [sortedDeals, setSortedDeals] = useState(deals);

  useEffect(() => {
    getSortedData();
  }, [sortValue]);

  const getSortedData = () => {
    switch (+sortValue) {
      case 1:
        setSortedDeals([...deals].sort((a, b) => a.price - b.price));
        break;

      case 2:
        setSortedDeals([...deals].sort((a, b) => +b.price - +a.price));
        break;

      case 3:
        setSortedDeals([...deals].sort((a, b) => a.name.localeCompare(b.name)));
        break;

      case 4:
        setSortedDeals([...deals].sort((a, b) => b.name.localeCompare(a.name)));
        break;

      default:
        setSortedDeals([...deals].sort((a, b) => a.id - b.id));

        break;
    }
  };

  return (
    <Table striped="columns">
      <thead>
        <tr>
          <th>#</th>
          <th>Название сделки</th>
          <th>Бюджет</th>
          <th>Дата создания</th>
          <th>Время создания</th>
        </tr>
      </thead>
      <tbody>
        {sortedDeals.map((item, i) => (
          <tr key={item.id}>
            <td>{i + 1}</td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>
              {moment(new Date(item.created_at * 1000)).format('DD MMMM YYYY')}
            </td>
            <td>{moment(new Date(item.created_at * 1000)).format('HH:mm')}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default DealsTable;
