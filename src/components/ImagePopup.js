function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_zoom popup_img_zoom ${card ? 'popup_opened' : ''}`}>
      <div className="popup__container-img">
        <button className="popup__close" onClick={onClose} type="button"></button>
        <div className="popup__img-card">
          <img className="popup__img" src={`${card ? card.link : ''}`} alt={`${card ? card.name : ''}`} />
          <p className="popup__title-img">{`${card ? card.name : ''}`}</p>
        </div>
      </div>
  </div>
  )
}

export default ImagePopup 