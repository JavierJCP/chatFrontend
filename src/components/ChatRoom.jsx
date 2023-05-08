import { useEffect, useState } from 'react';
import '../styles/ChatRoom.css';
import ScrollToBottom from 'react-scroll-to-bottom';
import { Arrow, Circle } from './icons';

function ChatRoom({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (currentMessage !== '') {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit('send_message', messageData);
      setMessageList((prevState) => [...prevState, messageData]);
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((prevState) => [...prevState, data]);
    });
  }, [socket]);

  return (
    <div className='chat__container'>
      <div className='chat__header'>
        <Circle />
        <p>Live Chat</p>
      </div>

      <div className='chat__body'>
        <ScrollToBottom className='message__container'>
          {messageList?.map((message) => (
            <div
              className='message'
              key={message.time}
              id={username === message.author ? 'you' : 'other'}
            >
              <div>
                <div className='message__content'>
                  <p>{message.message}</p>
                </div>
                <div className='message__meta'>
                  <p id='time'>{message.time}</p>
                  <p id='author'>{message.author}</p>
                </div>
              </div>
            </div>
          ))}
        </ScrollToBottom>
      </div>

      <div className='chat__footer'>
        <form className='form__chat' onSubmit={sendMessage}>
          <input
            className='chat__input'
            type='text'
            value={currentMessage}
            placeholder='Hey...'
            onChange={(e) => setCurrentMessage(e.target.value)}
          />
          {/* <button onClick={sendMessage}>&#9658;</button> */}
          <button className='chat__button' type='submit'>
            <Arrow />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatRoom;
