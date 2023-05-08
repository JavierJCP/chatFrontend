import { useEffect, useRef, useState } from 'react';

export function useInputs() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = username === '';
      return;
    }
    if (username === '') {
      setError('You need a username');
      return;
    }
    if (room === '') {
      setError('You need a room number');
      return;
    }
    if (room.match(/[A-Za-z]/)) {
      setError('Room must be a number');
      return;
    }
    setError(null);
  }, [username, room]);

  return { username, room, setUsername, setRoom, error };
}
