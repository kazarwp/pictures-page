import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup ";
import api from "../untils/Api";
import { useEffect, useState, useRef } from "react";
import CurrentUserContext from "../context/CurrentUserContext";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import * as auth from '../untils/Auth'

function App() {
  /* Хуки */
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [isSucces, setIsSucces] = useState(false)
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const handleInfoTooltip = () => {
    setIsInfoTooltipOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPhotoClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleUpdateAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsSucces(false)
    setIsInfoTooltipOpen(false)
  };

  function handleUpdateUser(data) {
    api
      .changeUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatarId) {
    api
      .updateAvatarProfile(avatarId)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCardInProfile(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    api
      .getStartCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards(cards.filter((item) => item._id !== card._id));
      })
      .catch((res) => {
        console.log(res);
      });
  }

  useEffect(() => {
    api
      .getInfoAboutUser()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  const [isLoggedIn, setLoggined] = useState(false);
  const [user, setUser] = useState(null)

  function checkToken() {
    const jwt = localStorage.getItem('jwt')
    if (!jwt) {
      return;
    }
    auth.getContent(jwt)
    .then(res => {
        if (res) {
          setLoggined(true)
          setUser(res.data.email)
          navigate("/")
        }
      })
      .catch(err => {
        setLoggined(false)
        console.log(err)
      })
    }

  useEffect(() => {
    checkToken()
  }, [navigate])

  //Register API
  function register(email, password) {
    auth.register(email, password)
      .then(() => {
        setIsSucces(true)
        handleInfoTooltip()
        navigate('/sign-in')
      })
      .catch(err => {
        setIsSucces(false)
        handleInfoTooltip()
        console.log(err)
      })
  }

  // Login API
  function login(email, password) {
    auth.login(email, password)
      .then((res) => {
        const jwt = res.token
        localStorage.setItem('jwt', jwt)
        setLoggined(true)
        navigate('/')
      })
      .catch(err => {
        console.log(err)
      })
  }

  // выход пользователя из аккаунта 
  function exitUser() {
    localStorage.removeItem('jwt')
    setUser('')
    setLoggined(false)
    navigate("/sign-in")
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header user={user} setUser={setUser} isLoggedIn={isLoggedIn} exitUser={exitUser}/>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPhotoClick}
                onEditAvatar={handleUpdateAvatarClick}
                onClickCard={handleCardClick}
                onCardLike={handleCardLike}
                cards={cards}
                onCardDelete={handleCardDelete}
                isLoggedIn = {isLoggedIn}
              />
            }
          />
          <Route path="/sign-in" element={<Login setLoggined={setLoggined} setUser={setUser} handleInfoTooltip={handleInfoTooltip} login={login}/>} />
          <Route path="/sign-up" element={<Register setLoggined={setLoggined} handleInfoTooltip={handleInfoTooltip} setIsSucces={setIsSucces} register={register}/>} />
        </Routes>
        <InfoTooltip />
        <EditProfilePopup
          onClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          onClose={closeAllPopups}
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlaceSubmit}
        />
        <InfoTooltip onClose={closeAllPopups} isSucces={isSucces} isOpen={isInfoTooltipOpen}/>
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        <Footer />
        <section className="popup popup_delete_disclamer">
          <div className="popup__container popup__delete-card">
            <h2 className="popup__title popup__title-delete">Вы уверены?</h2>
            <button className="popup__button popup__button-delete">Да</button>
            <button className="popup__close" type="button"></button>
          </div>
        </section>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
