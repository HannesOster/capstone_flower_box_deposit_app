import { useState } from "react";
import Header from "../../components/Header/Header";
import Modal from "react-modal";
import useSWR from "swr";
import {
  Button,
  MenuContainer,
  StyledLink,
} from "../../components/Buttons/styles";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { StockContainer, modalStyles } from "../../page-styles/styles";
import { routes } from "../../utils/routes";

export default function Menu() {
  const { data } = useSWR("/api/stock", {
    initialData: [],
    revalidateOnMount: true,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <Header />
      <MenuContainer>
        <StyledLink color="theme.secondary" href={routes.customersAdd}>
          Kunden hinzufügen
        </StyledLink>
        <StyledLink href={routes.customersEditSearch}>
          Kunden bearbeiten
        </StyledLink>
        <Button type="button" onClick={openModal}>
          Lagerbestand
        </Button>
        <StyledLink href={routes.customersMap}>Karte</StyledLink>
      </MenuContainer>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Lagerbestand Modal"
        style={modalStyles}
      >
        <StockContainer>
          <h2>Lagerbestand</h2>
          <p>{data ? data[0].stock : <LoadingSpinner />} Kisten</p>
          <Button size="s" variant="danger" onClick={closeModal}>
            Schließen
          </Button>
        </StockContainer>
      </Modal>
    </>
  );
}
