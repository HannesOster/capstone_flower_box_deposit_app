import React, { useState } from "react";
import useSWR from "swr";
import { GreenButton, RedButton } from "../Buttons/styles";
import ReactModal from "react-modal";
import {
  CustomerInfoInput,
  InfoText,
  InfoContainer,
  CustomerInfoForm,
  CustomerInfoButtonContainer,
  Placeholder,
  InfoModalStyle,
} from "./styles";

export default function CustomerInfo({ customer, id }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate } = useSWR(`/api/customer/${id}`);

  function handleArrowClick() {
    setIsExpanded(!isExpanded);
  }

  async function editCustomerInfo(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const customerData = Object.fromEntries(formData);

    const response = await fetch(`/api/customer/${id}`, {
      method: "PATCH",
      body: JSON.stringify(customerData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(response.status);
      return;
    }

    setIsModalOpen(false);
    mutate();
  }

  return (
    <section>
      <InfoContainer>
        <span>Kundeninformation</span>
        <InfoText onClick={handleArrowClick}>{isExpanded ? "▼" : "▶"}</InfoText>
      </InfoContainer>
      {isExpanded && (
        <>
          <p>Kundeninfo: {customer.info ? customer.info : ""}</p>
          <button onClick={() => setIsModalOpen(true)}>
            Kundeninfo bearbeiten
          </button>
        </>
      )}
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Kundeninfo bearbeiten"
        style={InfoModalStyle}
      >
        <CustomerInfoForm onSubmit={(event) => editCustomerInfo(event)}>
          <CustomerInfoInput
            type="text"
            minLength="10"
            rows="30"
            name="info"
            id="info"
            defaultValue={customer.info || ""}
          />
          <CustomerInfoButtonContainer>
            <RedButton onClick={() => setIsModalOpen(false)}>
              Abbrechen
            </RedButton>
            <GreenButton type="submit">Speichern</GreenButton>
          </CustomerInfoButtonContainer>
        </CustomerInfoForm>
      </ReactModal>
      <Placeholder />
    </section>
  );
}
