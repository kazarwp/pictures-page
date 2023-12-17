import { useState, useEffect } from "react"
import PopupWithForm from "./PopupWithForm"

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

  const [name, setName] = useState('')
  const [link, setLink] = useState('')

  function handleChangeName(e) {
    setName(e.target.value)
  }

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleChangeLink(e) {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  return(
    <PopupWithForm
          title="Новое фото"
          name="add"
          button="Создать"
          prop="popup__form_clear_field popup__form_validate_photo"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
        >
          <input
            value={name}
            className="popup__input popup__input_card_name"
            type="text"
            id="card-name"
            placeholder="Название"
            name="name"
            minLength="2"
            maxLength="30"
            required
            onChange={handleChangeName}
          />
          <span
            className="popup__placeholder popup__placeholder_error_name"
            id="card-name-error"
          ></span>
          <input
            value={link}
            className="popup__input popup__input_card_img"
            id="card-img"
            type="url"
            placeholder="Ссылка на картинку"
            name="link"
            required
            onChange={handleChangeLink}
          />
          <span
            className="popup__placeholder popup__placeholder_error_job"
            id="card-img-error"
          ></span>
        </PopupWithForm>
  )
}

export default AddPlacePopup