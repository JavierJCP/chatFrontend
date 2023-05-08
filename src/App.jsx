import { useState } from 'react';
import io from 'socket.io-client';
import ChatRoom from './components/ChatRoom';
import { useInputs } from './hooks/useInputs';
import Image from './assets/frontImage.avif';

import './styles/App.css';

const socket = io.connect('http://localhost:3001');

function App() {
  const { username, room, setUsername, setRoom, error } = useInputs();
  const [showChats, setShowChat] = useState(false);

  const joinRooms = (e) => {
    e.preventDefault();
    if (error) return null;
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      setShowChat(true);
    }
  };

  return (
    <>
      {!showChats ? (
        <header>
          <h1 className='title'>Keep in touch</h1>
          <img className='front__image' src={Image} alt='image' />

          <form className='form' onSubmit={joinRooms}>
            <div className='form__container'>
              <div className='form__group'>
                <input
                  className='form__input'
                  type='text'
                  id='name'
                  autoComplete='off'
                  placeholder=' '
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor='name' className='form__label'>
                  Username
                </label>
                <span className='form__line'></span>
              </div>

              <div className='form__group'>
                <input
                  className='form__input'
                  type='text'
                  autoComplete='off'
                  id='room'
                  placeholder=' '
                  onChange={(e) => setRoom(e.target.value)}
                />
                <label htmlFor='room' className='form__label'>
                  Room
                </label>
                <span className='form__line'></span>
              </div>
            </div>

            <button type='submit' className='form__button'>
              Join A Room
            </button>
          </form>
          {error && <small className='error'>{error}</small>}
        </header>
      ) : (
        <main>
          <ChatRoom socket={socket} username={username} room={room} />
        </main>
      )}
    </>
  );
}

export default App;
