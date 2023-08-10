import useSWR from "swr";
import { useEffect } from "react";
import {
  HeadingTableRow,
  StyledTable,
  StyledTableCell,
  StyledTableHeading,
  StyledTableParagraph,
  StyledTableRow,
  ExtendListIcon,
  StyledTableHeadingAttachments,
  ReducedListIcon,
  CheckIcon,
  CrossIcon,
  DownIcon,
  UpIcon,
} from "./styles";
import formatTimestamp from "../../utils/formatTimestamp";

import { useState } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Invitation } from "../SearchInput/styles";
import { routes } from "../../utils/routes";

export default function List() {
  const [isExtended, setIsExtended] = useState(false);
  const [sortedArray, setSortedArray] = useState([]);
  const [sortMode, setSortMode] = useState("name");
  const { data, error } = useSWR(routes.customersApiRoute, {
    initialData: [],
    revalidateOnMount: true,
  });

  useEffect(() => {
    if (data) {
      const sorted = [...data].sort((a, b) => a.name.localeCompare(b.name));
      setSortedArray(sorted);
    }
  }, [data]);

  function toggleSortMode(newSortMode) {
    let newSortedArray = [...sortedArray];

    if (sortMode === newSortMode) {
      newSortedArray.reverse();
      setSortMode(null);
    } else {
      setSortMode(newSortMode);
      const sortFunctions = {
        name: (a, b) => a.name.localeCompare(b.name),
        photo: (a, b) => (a.image ? (b.image ? 0 : 1) : -1),
        boxes: (a, b) => b.boxes - a.boxes,
        date: (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
      };
      newSortedArray.sort(sortFunctions[newSortMode]);
    }

    setSortedArray(newSortedArray);
  }

  if (error) {
    return <Invitation>Bitte einloggen</Invitation>;
  }

  if (!sortedArray || sortedArray.length === 0) {
    return <LoadingSpinner />;
  }
  return (
    <StyledTable>
      {isExtended ? (
        <ReducedListIcon onClick={() => setIsExtended(!isExtended)} />
      ) : (
        <ExtendListIcon onClick={() => setIsExtended(!isExtended)} />
      )}
      <tbody>
        <HeadingTableRow>
          <StyledTableHeading
            onClick={() => toggleSortMode("name")}
            active={sortMode === "name"}
          >
            <StyledTableParagraph>
              Kunde
              {sortMode === "name" ? <DownIcon /> : <UpIcon />}
            </StyledTableParagraph>{" "}
          </StyledTableHeading>
          <StyledTableHeading
            onClick={() => toggleSortMode("boxes")}
            active={sortMode === "boxes"}
          >
            Kisten
            {sortMode === "boxes" ? <DownIcon /> : <UpIcon />}
          </StyledTableHeading>
          {isExtended ? (
            <>
              <StyledTableHeading>Eimer</StyledTableHeading>
              <StyledTableHeadingAttachments>
                Aufsätze
              </StyledTableHeadingAttachments>
              <StyledTableHeading>Datum</StyledTableHeading>
            </>
          ) : null}
          {isExtended ? null : (
            <StyledTableHeading
              onClick={() => toggleSortMode("photo")}
              active={sortMode === "photo"}
            >
              Foto {sortMode === "photo" ? <DownIcon /> : <UpIcon />}
            </StyledTableHeading>
          )}
        </HeadingTableRow>
        {sortedArray.map((customer) => (
          <StyledTableRow key={customer._id}>
            <StyledTableCell isActive={isExtended}>
              <StyledTableParagraph>{customer.name}</StyledTableParagraph>
            </StyledTableCell>
            <StyledTableCell isActive={isExtended}>
              {customer.boxes}
            </StyledTableCell>
            {isExtended ? (
              <>
                {" "}
                <StyledTableCell>{customer.buckets}</StyledTableCell>
                <StyledTableCell>{customer.attachments}</StyledTableCell>{" "}
                <StyledTableCell>
                  {formatTimestamp(customer.timestamp)}
                </StyledTableCell>
              </>
            ) : null}
            {isExtended ? null : (
              <StyledTableCell>
                {customer.image ? <CheckIcon /> : <CrossIcon />}
              </StyledTableCell>
            )}
          </StyledTableRow>
        ))}
      </tbody>
    </StyledTable>
  );
}
