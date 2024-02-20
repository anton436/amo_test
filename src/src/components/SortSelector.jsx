import React from 'react';
import { Form } from 'react-bootstrap';

const SortSelector = ({ onChangeSortValue }) => {
  const handleChangeSortValue = (e) => {
    onChangeSortValue(e.target.value);
  };
  return (
    <Form.Select className="w-25" onChange={handleChangeSortValue}>
      <option value="0">Без сортировки</option>
      <option value="1">Сортировка по бюджету по возраст</option>
      <option value="2">Сортировка по бюджету по убыванию</option>
      <option value="3">Сортировка по названию А-Я</option>
      <option value="4">Сортировка по названию Я-А</option>
    </Form.Select>
  );
};

export default SortSelector;
