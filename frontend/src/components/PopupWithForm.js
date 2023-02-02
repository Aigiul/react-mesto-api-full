import React from "react";

function PopupWithForm({
  title,
  name,
  children,
  isOpen,
  onClose,
  buttonText,
  onSubmit,
}) {
  return (
    <div
      className={
        isOpen
          ? `popup popup_type_${name} popup_opened`
          : `popup popup_type_${name}`
      }
    >
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          name={name}
          className="popup__form"
          onSubmit={onSubmit}
        >
          {children}
          <button type="submit" className="popup__save-button">
            {buttonText}
          </button>
          <button
            type="button"
            className="popup__close-button"
            onClick={onClose}
          />
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;