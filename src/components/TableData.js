import React from "react";
import { Table } from "react-bootstrap";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "displayName",
    label: "Parameter",
  },
  {
    id: "lastUpdated",
    label: "Last updated",
  },
  {
    id: "lastValue",
    label: "Last value",
  },
  {
    id: "count",
    label: "Count",
  },
  {
    id: "unit",
    label: "Unit",
  },
];

function Enhancedthead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <thead>
      <tr>
        {headCells.map((headCell) => (
          <td
            key={headCell.id}
          >
            <div
            
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <div component="span">
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </div>
              ) : null}
            </div>
          </td>
        ))}
      </tr>
    </thead>
  );
}

export default function EnhancedTable(props) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("displayName");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <Table responsive className="mt-5">
      <Enhancedthead
        order={order}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
        rowCount={props.parameters.length}
      />
      <tbody>
        {stableSort(props.parameters, getComparator(order, orderBy)).map(
          (row, index) => {
            return (
              <tr key={index}>
                <td>{row.displayName}</td>
                <td>{new Date(row.lastUpdated).toLocaleDateString()}</td>
                <td>{row.lastValue}</td>
                <td>{row.count}</td>
                <td>{row.unit}</td>
              </tr>
            );
          }
        )}
      </tbody>
    </Table>
  );
}
