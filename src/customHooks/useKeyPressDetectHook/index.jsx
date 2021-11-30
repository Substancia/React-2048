import { useEffect, useState } from "react";

const useKeyPressDetectHook = () => {
  const [pressedKey, setPressedKey] = useState(null);

  const keyDown = ({ key }) => setPressedKey(key);

  const keyUp = ({ key }) => {
    setPressedKey(null);
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);

    return () => {
      window.removeEventListener('keydown', keyDown);
      window.removeEventListener('keyup', keyUp);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return pressedKey;
}

export default useKeyPressDetectHook;