import styled from "styled-components";

const StyledTableHeading = styled.th`
  background-color: ${(props) =>
    props.active ? "#fff6f4" : "rgb(211, 17, 25)"};
  color: ${(props) => (props.active ? "black" : "#fff6f4")};
  text-align: center;

  &:first-child {
    text-align: left;
  }
`;
const StyledTableCell = styled.td`
  width: 33%;
  border-right: 1px solid black;
  text-align: center;
  &:first-child {
    text-align: left;
  }
`;
const StyledTable = styled.table`
  border: 1px solid black;
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 100px;
`;
const StyledTableRow = styled.tr`
  height: 50px;
  &:nth-child(odd) {
    background-color: lightgrey;
  }
`;
const HeadingTableRow = styled.tr`
  height: 50px;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
`;

export {
  StyledTable,
  StyledTableHeading,
  StyledTableCell,
  StyledTableRow,
  HeadingTableRow,
};
