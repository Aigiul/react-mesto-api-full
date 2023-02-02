import React from "react";

function ImagePopup({ card, onClose, isImageOpen }) {
  return (
    <div className={`popup popup_view-card ${isImageOpen && "popup_opened"}`}>
      <div className="popup__preview">
        <figure className="popup__figure">
          <img className="popup__image" src={card.link} alt={card.name} />
          <figcaption className="popup__figcaption">{card.name}</figcaption>
        </figure>
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default ImagePopup;
