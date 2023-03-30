import { useState, useEffect } from 'react';
import { Text } from '@chakra-ui/react';

function TypeEffect() {
  const [text, setText] = useState("");
  const [phrases, setPhrases] = useState([
    "benefits and drawbacks of social media",
    "effects of climate change on the planet",
    "impact of technology on our daily lives",
    "importance of physical exercise and its impact on health",
    "impact of globalization on cultural identity",
    "pros and cons of remote work and its impact on work-life balance",
    "history and evolution of human rights",
    "benefits and challenges of artificial intelligence",
    "effects of mental health on personal and professional life",
    "impact of music on our emotions and well-being",
    "benefits and challenges of renewable energy sources",
    "role of education in shaping a person's life",
    "impact of social class on access to education and opportunities",
    "importance of ethical behavior in business and personal life",
    "effects of advertising on consumer behavior",
    "impact of mass media on society",
    "role of sports in promoting physical and mental health",
    "effects of aging on physical and mental health",
    "impact of poverty on children and their development",
    "benefits and challenges of international trade",
    "importance of family and its role in shaping one's life",
    "effects of immigration on social and economic dynamics",
    "impact of political polarization on society",
    "benefits and drawbacks of online learning",
    "role of the arts in society and personal development"
  ]);
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

  return (
    <Text fontSize="xl" position="absolute">
      Write an essay about the{" "}
      <Text as="span" color="gray.500">
        {text}
      </Text>
      <span style={{ opacity: 0.5 }}>|</span>
    </Text>
  );}

export default TypeEffect;
