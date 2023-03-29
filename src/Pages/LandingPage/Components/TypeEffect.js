import { useState, useEffect } from 'react';
import { Text } from '@chakra-ui/react';

function TypeEffect() {
  const [text, setText] = useState("");
  const [phrases, setPhrases] = useState(["a new book", "a great movie", "an interesting topic", "a meaningful experience"]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);
  const [delay, setDelay] = useState(120);

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentText = phrases[index];
      const currentLength = text.length;

      if (!isDeleting) {
        setText(currentText.substring(0, currentLength + 1));
        setDelay(120);
      } else {
        setText(currentText.substring(0, currentLength - 1));
        setDelay(30);
      }

      if (isDeleting) {
        if (text === "") {
          setIsDeleting(false);
          setIndex((index + 1) % phrases.length);
        }
      } else {
        if (text === phrases[index]) {
          setIsDeleting(true);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, phrases, isDeleting, index, delay]);

  return <Text fontSize="xl" position={"absolute"}>Write an essay about {text}<span style={{opacity: 0.5}}>|</span></Text>;
}

export default TypeEffect;
