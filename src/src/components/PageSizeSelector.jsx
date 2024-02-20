import React from 'react';
import { Form } from 'react-bootstrap';

function PageSizeSelector({ onChangePageSize, setCurrentPage }) {
  const handlePageSizeChange = (event) => {
    const size = event.target.value;
    setCurrentPage(1);
    onChangePageSize(size);
  };

  return (
    <Form.Select className="w-25 me-3" onChange={handlePageSizeChange}>
      <option value="2">Показать 2 сделки</option>
      <option value="5">Показать 5 сделок</option>
      <option value="10">Показать 10 сделок</option>
      <option value="">Показать все сделки</option>
    </Form.Select>
  );
}

export default PageSizeSelector;
