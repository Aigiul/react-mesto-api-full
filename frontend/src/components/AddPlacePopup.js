import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isAddPlacePopupOpen, closeAllPopups, onSubmit }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isAddPlacePopupOpen])

  return (
    <PopupWithForm
      title="Новое место"
      name="place"
      buttonText="Создать"
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({ name, link });
      }}
    >
      <input
        type="text"
        className="popup__input"
        id="input-popup-title-card"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
        placeholder="Название"
        name="name"
        minLength={2}
        maxLength={30}
        required />
      <span className="popup__error-message input-popup-title-card-error" />
      <input
        type="URL"
        className="popup__input"
        id="input-popup-link-card"
        value={link}
        onChange={(event) => {
          setLink(event.target.value);
        }}
        placeholder="Ссылка на картинку"
        name="link" required />
      <span className="popup__error-message input-popup-link-card-error" />
    </PopupWithForm>
  )
}

export default AddPlacePopup;
