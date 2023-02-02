import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { React, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";
import { Route, Switch, useHistory } from 'react-router-dom';
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import Login from './Login.js';
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";
import * as auth from "../utils/auth.js";
import done from "../images/done.svg";
import fail from "../images/fail.svg";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState({ opened: false, success: false });
  const [currentPath, setCurrentPath] = useState('/');
  const history = useHistory();

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.error(err);
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
        console.error(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.error(err);
      })
  }


  //обработчики событий попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const handleConfirmClick = () => {
    setIsConfirmationPopupOpen(!isConfirmationPopupOpen);
  };

  const handleCardClick = (card) => {
    setIsImageOpen(true);
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setIsImageOpen(false);
    setInfoTooltipOpen({ opened: false, success: false })
  };


  // обработчик по Escape
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImageOpen || isInfoTooltipOpen.opened

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]) 

  function handleAddPlaceSubmit(card) {
    api
      .addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateUser(userData) {
    api
      .addProfileInfo(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .newAvatar(data)
      .then((item) => {
        setCurrentUser({ ...currentUser, avatar: item.avatar });
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const handleChangePath = (newPath) => {
		setCurrentPath(newPath);
	 }

	// Проверка токена:
	useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return; // нет токена, значит, не нужно делать запрос
    auth.checkToken(token)
   .then(result => {
      if (result) {
        setUserEmail(result.data.email);
        setLoggedIn(true);
        history.push('/');
        setCurrentPath('/');
      } else {
        throw new Error ('Ошибка текущего сеанса. Необходимо заново авторизироваться')
      }
    })
    .catch (err => {
      console.log(`Ошибка входа по токену ${err}`);
      history.push('/sign-in');
    })
  }, [])

	 // Обработчик завершения:
	 const handleLogout = () => {
		localStorage.removeItem('token');
		setUserEmail('');
		setLoggedIn(false);
		history.push('/sign-in');
		setCurrentPath('/sign-in');
	}

	 // Обработчик регистрации:
	 const handleSignupSubmit = (email, password) => {
		 auth.register (email, password)
		 .then((result) => {
			 if (result) {
				 setUserEmail(result.data.email);
				 setInfoTooltipOpen({ opened: true, success: true });
				 setLoggedIn(true);
				 history.push('/sign-in');
				 setCurrentPath('/sign-in');
			 }
			 else {
				 throw new Error('Не удалось пройти регистрацию');
			 }
		 })
		 .catch( err => {
		 console.log(`Ошибка регистрации ${err}`);
		 setInfoTooltipOpen({ opened: true, success: false })
	 })
 }

	 // Обработчик авторизации:
	 const handleSigninSubmit = (email, password) => {
		 auth.authorization (email, password)
		 .then((data) => {
			 if (data.token) {
				 localStorage.setItem('token', data.token);
				 setUserEmail(email);
				 setLoggedIn(true);
				 history.push('/');
				 setCurrentPath('/');
			 }
			 else {
				 throw new Error('Не удалось получить токен от сервера');
			 }
		 })
		 .catch( err => {
			 console.log(alert(`Ошибка авторизации ${err}. Проверьте корректность данных`))
	 })
	 }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
			userEmail={userEmail}
			onLogout={handleLogout}
			path={currentPath} />

			<Switch>
        <Route path='/sign-in'>
          <Login onSignin={handleSigninSubmit} onChangePath={handleChangePath}/>
        </Route>
        <Route path='/sign-up'>
          <Register onSignup={handleSignupSubmit} onChangePath={handleChangePath} />
        </Route>


				<ProtectedRoute path='/'
      		loggedIn={loggedIn}
					component={Main}
        	onEditAvatar={handleEditAvatarClick}
        	onEditProfile={handleEditProfileClick}
        	onAddPlace={handleAddPlaceClick}
        	onCardClick={handleCardClick}
        	onCardLike={handleCardLike}
        	onCardDelete={handleCardDelete}
        	cards={cards}
        	onSubmit={handleAddPlaceSubmit}
				/>
			</Switch>
      <Footer />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <ImagePopup
        isImageOpen={isImageOpen}
        card={selectedCard}
        onClose={closeAllPopups}
      ></ImagePopup>
      <InfoTooltip
        isOpen={isInfoTooltipOpen.opened}
        onClose={closeAllPopups}
        statusImage={isInfoTooltipOpen.success ? done : fail}
        title={isInfoTooltipOpen.success ? 'Вы успешно зарегистрировались!':'Что-то пошло не так! Попробуйте ещё раз'} />
      <PopupWithForm
        title="Вы уверены?"
        name="confirmation"
        buttonText="Да"
        isOpen={isConfirmationPopupOpen}
        onClose={closeAllPopups}
      >
      </PopupWithForm>
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      ></EditAvatarPopup>
      <AddPlacePopup
        isAddPlacePopupOpen={isAddPlacePopupOpen}
        closeAllPopups={closeAllPopups}
        onSubmit={handleAddPlaceSubmit}
      ></AddPlacePopup>
    </CurrentUserContext.Provider>
  );
}

export default App;
