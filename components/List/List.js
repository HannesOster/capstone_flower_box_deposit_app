import useSWR from "swr";
import {
  StyledTable,
  StyledTableCell,
  StyledTableHeading,
  StyledTableRow,
} from "./styles";

export default function List({ customerData }) {
  const { data } = useSWR("/api", { fallbackData: [] });
  return (
    <StyledTable>
      <tbody>
        <StyledTableRow>
          <StyledTableHeading>Kunde</StyledTableHeading>
          <StyledTableHeading>Kisten</StyledTableHeading>
          <StyledTableHeading>Eimer</StyledTableHeading>
        </StyledTableRow>
        {data.map((customer) => (
          <StyledTableRow key={customer.id}>
            <StyledTableCell>{customer.name}</StyledTableCell>
            <StyledTableCell>{customer.boxes}</StyledTableCell>
            <StyledTableCell>{customer.buckets}</StyledTableCell>
          </StyledTableRow>
        ))}
      </tbody>
    </StyledTable>
  );
}
