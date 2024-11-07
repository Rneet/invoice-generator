import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { BiTrash } from "react-icons/bi";
import EditableField from './EditableField';

class InvoiceItem extends React.Component {
  render() {
    const { onItemizedItemEdit, onRowDel, onRowAdd, items, currency } = this.props;

    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>ITEM</th>
              <th>QTY</th>
              <th>PRICE/RATE</th>
              <th className="text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <ItemRow 
                key={item.id} 
                item={item} 
                onItemizedItemEdit={onItemizedItemEdit} 
                onDelEvent={onRowDel} 
                currency={currency} 
              />
            ))}
          </tbody>
        </Table>
        <Button className="fw-bold" onClick={onRowAdd}>Add Item</Button>
      </div>
    );
  }
}

class ItemRow extends React.Component {
  handleDelete = () => {
    this.props.onDelEvent(this.props.item);
  };

  render() {
    const { item, onItemizedItemEdit, currency } = this.props;

    return (
      <tr>
        <td>
          <EditableField
            onItemizedItemEdit={onItemizedItemEdit}
            cellData={{ type: "text", name: "name", placeholder: "Item name", value: item.name, id: item.id }}
          />
          <EditableField
            onItemizedItemEdit={onItemizedItemEdit}
            cellData={{ type: "text", name: "description", placeholder: "Item description", value: item.description, id: item.id }}
          />
        </td>
        <td>
          <EditableField
            onItemizedItemEdit={onItemizedItemEdit}
            cellData={{ type: "number", name: "quantity", min: 1, value: item.quantity, id: item.id }}
          />
        </td>
        <td>
          <EditableField
            onItemizedItemEdit={onItemizedItemEdit}
            cellData={{ type: "number", name: "price", min: 1, step: "0.01", value: item.price, id: item.id, leading: currency }}
          />
        </td>
        <td className="text-center">
          <BiTrash 
            onClick={this.handleDelete} 
            style={{ cursor: 'pointer', color: 'red' }} 
          />
        </td>
      </tr>
    );
  }
}

export default InvoiceItem;
