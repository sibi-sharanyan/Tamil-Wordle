import {
  Box,
  Button,
  HStack,
  Link,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
} from "@chakra-ui/react";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useToast } from "@chakra-ui/react";
import dayjs from "dayjs";
import copy from "copy-to-clipboard";

import {
  BsTwitter,
  BsFillHeartFill,
  BsLinkedin,
  BsGithub,
  BsShare,
} from "react-icons/bs";
import validWords from "../wordlist/all-word";
import easyWords from "../wordlist/easy-words";

import "../styles/keyboard.scss";

// function toUnicode(str) {
//   return str
//     .split("")
//     .map(function (value, index, array) {
//       var temp = value
//         .charCodeAt(0)
//         .toString(16)
//         .padStart(4, "0")
//         .toUpperCase();
//       if (temp.length > 2) {
//         return "\\u" + temp;
//       }
//       return value;
//     })
//     .join("");
// }

const tamilCharacters = [
  ["க்", "க", "கா", "கி", "கீ", "கு", "கூ", "கெ", "கே", "கை", "கொ", "கோ", "கௌ"],
  ["ங்", "ங", "ஙா", "ஙி", "ஙீ", "ஙு", "ஙூ", "ஙெ", "ஙே", "ஙை", "ஙொ", "ஙோ", "ஙௌ"],
  ["ச்", "ச", "சா", "சி", "சீ", "சு", "சூ", "செ", "சே", "சை", "சொ", "சோ", "சௌ"],
  ["ஞ்", "ஞ", "ஞா", "ஞி", "ஞீ", "ஞு", "ஞூ", "ஞெ", "ஞே", "ஞை", "ஞொ", "ஞோ", "ஞௌ"],
  ["ட்", "ட", "டா", "டி", "டீ", "டு", "டூ", "டெ", "டே", "டை", "டொ", "டோ", "டௌ"],
  ["ண்", "ண", "ணா", "ணி", "ணீ", "ணு", "ணூ", "ணெ", "ணே", "ணை", "ணொ", "ணோ", "ணௌ"],
  ["த்", "த", "தா", "தி", "தீ", "து", "தூ", "தெ", "தே", "தை", "தொ", "தோ", "தௌ"],
  ["ந்", "ந", "நா", "நி", "நீ", "நு", "நூ", "நெ", "நே", "நை", "நொ", "நோ", "நௌ"],
  ["ப்", "ப", "பா", "பி", "பீ", "பு", "பூ", "பெ", "பே", "பை", "பொ", "போ", "பௌ"],
  ["ம்", "ம", "மா", "மி", "மீ", "மு", "மூ", "மெ", "மே", "மை", "மொ", "மோ", "மௌ"],
  ["ய்", "ய", "யா", "யி", "யீ", "யு", "யூ", "யெ", "யே", "யை", "யொ", "யோ", "யௌ"],
  ["ர்", "ர", "ரா", "ரி", "ரீ", "ரு", "ரூ", "ரெ", "ரே", "ரை", "ரொ", "ரோ", "ரௌ"],
  ["ல்", "ல", "லா", "லி", "லீ", "லு", "லூ", "லெ", "லே", "லை", "லொ", "லோ", "லௌ"],
  ["வ்", "வ", "வா", "வி", "வீ", "வு", "வூ", "வெ", "வே", "வை", "வொ", "வோ", "வௌ"],
  ["ழ்", "ழ", "ழா", "ழி", "ழீ", "ழு", "ழூ", "ழெ", "ழே", "ழை", "ழொ", "ழோ", "ழௌ"],
  ["ள்", "ள", "ளா", "ளி", "ளீ", "ளு", "ளூ", "ளெ", "ளே", "ளை", "ளொ", "ளோ", "ளௌ"],
  ["ற்", "ற", "றா", "றி", "றீ", "று", "றூ", "றெ", "றே", "றை", "றொ", "றோ", "றௌ"],
  ["ன்", "ன", "னா", "னி", "னீ", "னு", "னூ", "னெ", "னே", "னை", "னொ", "னோ", "னௌ"],
];

const SocialHandle = () => (
  <VStack spacing={3}>
    <HStack>
      <Text>Made with</Text>
      <BsFillHeartFill color="red" />
      <Text>
        in தமிழ் by <strong>Sibi</strong>
      </Text>
    </HStack>
    <HStack spacing={6}>
      <BsGithub
        fontSize={24}
        onClick={() => {
          if (window) {
            window.open("https://github.com/sibi-sharanyan", "_blank")?.focus();
          }
        }}
        cursor={"pointer"}
        color="white"
      />
      <BsLinkedin
        fontSize={24}
        onClick={() => {
          if (window) {
            window
              .open("https://www.linkedin.com/in/sibi-sharanyan", "_blank")
              ?.focus();
          }
        }}
        cursor={"pointer"}
        color="white"
      />{" "}
      <BsTwitter
        fontSize={24}
        onClick={() => {
          if (window) {
            window
              .open("https://twitter.com/sibi_sharanyan", "_blank")
              ?.focus();
          }
        }}
        cursor={"pointer"}
        color="white"
      />{" "}
    </HStack>
    <Link
      href="https://www.buymeacoffee.com/sibisharanyan"
      target="_blank"
      py={4}
    >
      <Image
        cursor={"pointer"}
        src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
        alt="Buy Me A Coffee"
        height={"60px"}
        width={"217px"}
      />
    </Link>
  </VStack>
);

export default function MainPage() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [disableInput, setDisableInput] = React.useState(false);
  const {
    isOpen: isGameOverOpen,
    onOpen: onGameOverOpenModal,
    onClose: onGameOverClose,
  } = useDisclosure();

  const [word, setWord] = React.useState<string[]>([]);
  const [filledCharacters, setFilledCharactersState] = React.useState<
    { char: string; bgColor?: string }[][]
  >([[]]);

  const setFilledCharacters = (
    data: { char: string; bgColor?: string }[][]
  ) => {
    setFilledCharactersState(data);

    try {
      let dataToBeStored: any = [];
      if (data.length !== 6) {
        dataToBeStored = data.slice(0, -1);
      } else {
        dataToBeStored = data;
      }

      dataToBeStored = dataToBeStored.filter(
        (data: any) => data.filter((d: any) => d.bgColor).length === 4
      );

      const dataToBeStoredString = JSON.stringify({
        currentWord: word,
        filledCharacters: dataToBeStored,
      });
      if (word.length && !isAnimationPlaying)
        localStorage.setItem("tamil-wordle-data", dataToBeStoredString);
    } catch (error) {}
  };

  const onGameOverOpen = () => {
    onGameOverOpenModal();
    setDisableInput(true);
  };

  const [blocks, setBlocks] = React.useState<number[][]>([]);
  const [lastPressedKey, setLastPressedKey] = React.useState("");
  const [currentRow, setCurrentRow] = React.useState(0);
  const [currentCol, setCurrentCol] = React.useState(0);
  const [isAnimationPlaying, setIsAnimationPlaying] = React.useState(false);
  const [isCorrect, setCorrect] = React.useState(false);
  const getBlocks = (wordLength: number) => {
    const blocks = [];
    for (let i = 0; i < 6; i++) {
      let x = [];
      for (let j = 0; j < wordLength; j++) {
        x.push(0);
      }
      blocks.push(x);
    }
    setBlocks(blocks);
  };

  const initiateAnswerAnimation = async (row: number, answers: string[]) => {
    setIsAnimationPlaying(true);
    answers.forEach((color, index) => {
      setTimeout(() => {
        let chars = filledCharacters;
        chars[row][index].bgColor = color;
        setFilledCharacters(chars);
        getBlocks(word.length);

        if (index === answers.length - 1) {
          setIsAnimationPlaying(false);
          if (answers.every((val, i, arr) => val === "#538d4e")) {
            toast({
              title: "சரியான வார்த்தை!",
              status: "success",
              position: "top",
              duration: 2000,
              isClosable: true,
            });
            setTimeout(() => {
              setCorrect(true);
              onGameOverOpen();
            }, 2000);
          }
        }
      }, index * 500);
    });
  };

  const isSameSeries = (a: string, b: string) => {
    return !!tamilCharacters.find(
      (val, i) => val.includes(a) && val.includes(b)
    );
  };

  const getWordBasedOnDate = (currentDateStr: string) => {
    const date1 = dayjs("2022-02-19");
    const date2 = dayjs(currentDateStr);
    const diffDays = date2.diff(date1, "day");

    //TODO: change to easy words
    const wordsCount = easyWords.length;

    const index = diffDays % wordsCount;
    let currentWord = easyWords[index];

    // console.log(
    //   "days",
    //   currentDateStr,
    //   diffDays,
    //   index,
    //   wordsCount,
    //   currentWord,
    //   currentWord.match(/[\u0b80-\u0bff][\u0bbe-\u0bcd\u0bd7]?/gi)
    // );

    return currentWord.match(
      /[\u0b80-\u0bff][\u0bbe-\u0bcd\u0bd7]?/gi
    ) as string[];
  };

  const isValidCharacter = (char: string) => {
    return tamilCharacters.some((val) => val.includes(char));
  };

  const fetchWordLength = async () => {
    const word = getWordBasedOnDate(dayjs().format("YYYY-MM-DD"));

    setWord(word);
    getBlocks(word.length);
  };

  const initStored = () => {
    try {
      const storedData = localStorage.getItem("tamil-wordle-data");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const correctWord = parsedData.currentWord.join("");

        if (
          parsedData.filledCharacters.length > 0 &&
          correctWord === word.join("")
        ) {
          let chars = parsedData.filledCharacters;
          chars = chars.filter((row: any) => row.length === 4);
          setCurrentRow(chars.length);
          const lastWord = chars[chars.length - 1]
            .map((v: any) => v.char)
            .join("");

          if (correctWord === lastWord) {
            onGameOverOpen();
          }

          chars[chars.length] = [];
          setFilledCharacters(chars);

          if (parsedData.filledCharacters.length === 6) {
            onGameOverOpen();
          }
        }
      }
    } catch (error) {
      setFilledCharactersState([[]]);
    }
  };

  useEffect(() => {
    fetchWordLength();
    let isOldUser = localStorage.getItem("isOldUser");
    // console.log("isOldUser", isOldUser);
    if (!isOldUser) {
      onOpen();
      localStorage.setItem("isOldUser", "true");
    }
  }, []);

  useEffect(() => {
    if (word.length) {
      initStored();
    }
  }, [word]);

  const ExampleWord1 = () => {
    let word = ["க", "டி", "த", "ம்"];

    return word.map((val, index) => (
      <Box
        key={val}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        fontWeight={"bold"}
        fontSize={["sm", "sm", "lg"]}
        w={[12, 12, 16]}
        h={[12, 12, 16]}
        border="2px solid #3a3a3c"
        color={"white"}
        bg={index === 0 ? "#538d4e" : ""}
      >
        {val}
      </Box>
    ));
  };

  const ExampleWord2 = () => {
    let word = ["வா", "லி", "ப", "ன்"];

    return word.map((val, index) => (
      <Box
        key={val}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        fontWeight={"bold"}
        fontSize={["sm", "sm", "lg"]}
        w={[12, 12, 16]}
        h={[12, 12, 16]}
        border="2px solid #3a3a3c"
        color={"white"}
        bg={index === 2 ? "#b59f3b" : ""}
      >
        {val}
      </Box>
    ));
  };

  const ExampleWord3 = () => {
    let word = ["கா", "த", "ல", "ன்"];

    return word.map((val, index) => (
      <Box
        key={val}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        fontWeight={"bold"}
        fontSize={["sm", "sm", "lg"]}
        w={[12, 12, 16]}
        h={[12, 12, 16]}
        border="2px solid #3a3a3c"
        color={"white"}
        bg={index === 3 ? "#3a3a3c" : ""}
      >
        {val}
      </Box>
    ));
  };

  const ExampleWord4 = () => {
    let word = ["கா", "கி", "த", "ம்"];

    return word.map((val, index) => (
      <Box
        key={val}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        fontWeight={"bold"}
        fontSize={["sm", "sm", "lg"]}
        w={[12, 12, 16]}
        h={[12, 12, 16]}
        border="2px solid #3a3a3c"
        color={"white"}
        bg={index === 1 ? "#713f48" : ""}
      >
        {val}
      </Box>
    ));
  };
  return (
    <VStack bg="black" h={"100%"}>
      <Modal isOpen={isGameOverOpen} onClose={onGameOverClose}>
        <ModalOverlay />
        <ModalContent bg={"gray.700"} color="white">
          <ModalHeader>விளையாடியதற்கு நன்றி!</ModalHeader>
          <ModalCloseButton />
          <ModalBody py={10}>
            <Text fontSize={"lg"}>
              புதிய வார்த்தையுடன் விளையாட, நாளை வாருங்கள்!
            </Text>

            <Button
              colorScheme={"green"}
              mt={10}
              onClick={() => {
                const date1 = dayjs("2022-02-19");
                const date2 = dayjs(dayjs().format("YYYY-MM-DD"));
                const diffDays = date2.diff(date1, "day");

                let text = `https://tamil-wordle.netlify.app ${diffDays} ${
                  currentRow === 5 ? (isCorrect ? 6 : "X") : currentRow
                }/6 \n`;
                for (let i = 0; i < currentRow + 1; i++) {
                  text += "\n";
                  for (let j = 0; j < 4; j++) {
                    if (!filledCharacters[i][j]) {
                      break;
                    }
                    if (filledCharacters[i][j].bgColor === "#538d4e") {
                      text += "🟩";
                    } else if (filledCharacters[i][j].bgColor === "#b59f3b") {
                      text += "🟨";
                    } else if (filledCharacters[i][j].bgColor === "#713f48") {
                      text += "🟫";
                    } else if (filledCharacters[i][j].bgColor === "#3a3a3c") {
                      text += "⬛";
                    }
                  }
                }

                copy(text);

                toast({
                  title: "Copied results to clipboard",
                  status: "info",
                  position: "top",
                  duration: 2000,
                  isClosable: false,
                });
              }}
            >
              <HStack spacing={3}>
                <Text>SHARE</Text>
                <BsShare />
              </HStack>
            </Button>
          </ModalBody>

          <ModalFooter>
            <SocialHandle />
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
        <ModalOverlay />
        <ModalContent bg="black" color={"white"} fontSize="sm">
          <ModalHeader textAlign={"center"}>எப்படி விளையாடுவது</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack
              alignItems={"flex-start"}
              spacing={4}
              borderBottom={"1px solid #3a3a3c"}
              pb={4}
            >
              <Text>ஆறு முயற்சிகளில் வார்த்தையை யூகிக்கவும்.</Text>
              <Text>
                ஒவ்வொரு யூகமும் செல்லுபடியாகும் வார்த்தையாக இருக்க வேண்டும்.
                சமர்ப்பிக்க <strong>Enter </strong>
                பொத்தானை அழுத்தவும்.
              </Text>
              <Text>
                ஒவ்வொரு யூகத்திற்கும் பிறகு, உங்கள் யூகம் வார்த்தைக்கு எவ்வளவு
                நெருக்கமாக இருந்தது என்பதைக் காட்ட ஓடுகளின் நிறம் மாறும்.
              </Text>
            </VStack>

            <VStack
              py={5}
              alignItems="flex-start"
              spacing={7}
              borderBottom={"1px solid #3a3a3c"}
            >
              <Text fontWeight={"bold"}>எடுத்துக்காட்டுகள்</Text>

              <VStack alignItems="flex-start">
                <HStack>{ExampleWord1()}</HStack>

                <Text>
                  <strong>க </strong> என்ற எழுத்து வார்த்தையில் சரியான இடத்தில்
                  உள்ளது.
                </Text>
              </VStack>

              <VStack alignItems="flex-start">
                <HStack>{ExampleWord2()}</HStack>

                <Text>
                  <strong>ப</strong> என்ற எழுத்து வார்த்தையில் உள்ளது, ஆனால்
                  தவறான இடத்தில் உள்ளது.
                </Text>
              </VStack>

              <VStack alignItems="flex-start">
                <HStack>{ExampleWord4()}</HStack>

                <Text>
                  <strong>கி</strong> என்ற எழுத்து வார்த்தையில் இல்லை, ஆனால் அது
                  இருக்கும் இடத்தில் அதே உயிர்மெய் வரிசையில் உள்ள வேறொரு எழுத்து
                  உள்ளது. (க், க, கா, கி, கீ, கு, கூ, கெ, கே, கை, கொ, கோ, கௌ)
                </Text>
              </VStack>

              <VStack alignItems="flex-start">
                <HStack>{ExampleWord3()}</HStack>

                <Text>
                  <strong>ன்</strong> என்ற எழுத்து எந்த இடத்திலும் வார்த்தையில்
                  இல்லை.
                </Text>
              </VStack>
            </VStack>

            <VStack alignItems={"flex-start"} pt={5}>
              <Text fontWeight={"black"}>
                ஒவ்வொரு நாளும் ஒரு புதிய வார்த்தை கிடைக்கும்!
              </Text>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <SocialHandle />
          </ModalFooter>
        </ModalContent>
      </Modal>

      <HStack
        h={"7%"}
        borderBottom={"1px solid #3a3a3c"}
        w="100%"
        justifyContent={"center"}
        mb={2}
      >
        <QuestionOutlineIcon
          position={"absolute"}
          left={"2rem"}
          cursor={"pointer"}
          mr={0}
          color={"white"}
          fontSize={"2xl"}
          fontWeight={"bold"}
          onClick={onOpen}
        />
        <Text fontWeight={"bold"} fontSize={"3xl"} color={"white"}>
          Wordle in தமிழ்
        </Text>
      </HStack>

      <VStack
        w={"100%"}
        h={"90%"}
        justifyContent={["space-evenly", "space-evenly", "space-evenly"]}
      >
        <VStack w="100%">
          {blocks.map((block, ind) => {
            return (
              <HStack
                justifyContent={"center"}
                key={ind}
                w={["100%", "70%", "60%", "30%"]}
                maxW={"22rem"}
              >
                {block.map((bl, ind2) => {
                  return (
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      fontWeight={"bold"}
                      fontSize={["sm", "sm", "md"]}
                      lineHeight="2rem"
                      key={ind2}
                      w={["20%", "20%", "20%"]}
                      h={["3rem", "3rem", "3.7rem"]}
                      border="2px solid #3a3a3c"
                      bg={
                        (filledCharacters[ind] &&
                          filledCharacters[ind][ind2] &&
                          filledCharacters[ind][ind2].bgColor) ||
                        ""
                      }
                      color={"white"}
                    >
                      {(filledCharacters[ind] &&
                        filledCharacters[ind][ind2] &&
                        filledCharacters[ind][ind2].char) ||
                        ""}
                    </Box>
                  );
                })}
              </HStack>
            );
          })}
        </VStack>

        <VStack w={["100%", "100%", "100%", "60%"]}>
          <Keyboard
            layout={{
              default: [
                "ா ி ீ ு ூ",
                "ஃ ெ ே ை ொ ோ ௌ ்",
                "ஆ ஈ ஊ ஏ ள ற ன ட ண ச ஞ",
                "அ இ உ ஐ எ க ப ம த ந ய",
                "ஔ ஓ ஒ வ ங ல ர ழ",
                "Enter {bksp}",
              ],
            }}
            onChange={(e) => {}}
            onKeyPress={(key: string) => {
              if (disableInput) return;
              if (isAnimationPlaying) {
                return;
              }

              let chars = filledCharacters;

              let diaterics = "ா ி ீ ு ூ ெ ே ை ொ ோ ௌ ்";

              if (key === "Enter") {
                // console.log("currentcol", currentCol, word.length);
                if (currentCol !== word.length) {
                  toast({
                    title: "போதுமான எழுத்துக்கள் இல்லை",
                    status: "info",
                    position: "top",
                    duration: 2000,
                    isClosable: false,
                  });
                  return;
                }

                let currentWord = filledCharacters[currentRow];
                let answers = [];

                let fullWord = currentWord
                  .map((val, i) => {
                    return val.char;
                  })
                  .join("");

                if (fullWord && validWords.length > 0) {
                  let isPresent = validWords.find((val) => val === fullWord);
                  if (!isPresent) {
                    toast({
                      title: "வார்த்தை பட்டியலில் இல்லை",
                      status: "info",
                      position: "top",
                      duration: 2000,
                      isClosable: false,
                    });
                    return;
                  }
                }

                const tempWord = [...word];

                for (let i = 0; i < tempWord.length; i++) {
                  if (currentWord[i].char === tempWord[i]) {
                    tempWord[i] = "@";
                  }
                }

                for (let i = 0; i < word.length; i++) {
                  if (currentWord[i].char === word[i]) {
                    answers.push("#538d4e");
                  } else if (tempWord.includes(currentWord[i].char)) {
                    const firstInd = tempWord.indexOf(currentWord[i].char);
                    if (firstInd !== -1) {
                      tempWord[firstInd] = "@";
                    }
                    answers.push("#b59f3b");
                  } else if (isSameSeries(word[i], currentWord[i].char)) {
                    answers.push("#713f48");
                  } else {
                    answers.push("#3a3a3c");
                  }
                }

                // console.log("answers", answers);
                initiateAnswerAnimation(currentRow, answers);
                if (currentRow + 1 === 6) {
                  toast({
                    title: word,
                    status: "info",
                    position: "top",
                    duration: 5000,
                    isClosable: false,
                  });
                  setIsAnimationPlaying(true);
                  setTimeout(() => {
                    onGameOverOpen();
                  }, 5000);
                  return;
                }

                chars[currentRow + 1] = [];
                setCurrentCol(0);
                setCurrentRow(currentRow + 1);
              } else if (key === "{bksp}") {
                if (currentCol > 0) {
                  chars[currentRow][currentCol - 1] = { char: "" };
                  setCurrentCol(currentCol - 1);
                }
              } else if (lastPressedKey && diaterics.includes(key)) {
                let newChar = String.fromCharCode(
                  lastPressedKey.charCodeAt(0),
                  key.charCodeAt(0)
                );
                // console.log(
                //   newChar,
                //   String.fromCharCode(
                //     lastPressedKey.charCodeAt(0),
                //     key.charCodeAt(0)
                //   )
                // );

                if (!isValidCharacter(newChar)) {
                  toast({
                    title: "செல்லுபடியாகாத எழுத்து",
                    status: "info",
                    position: "top",
                    duration: 2000,
                    isClosable: false,
                  });
                  return;
                }

                chars[currentRow][currentCol - 1] = { char: newChar };
                setLastPressedKey("");
              } else if (!diaterics.includes(key) && currentCol < word.length) {
                setLastPressedKey(key);
                chars[currentRow][currentCol] = { char: key };
                setCurrentCol(currentCol + 1);
              }

              setFilledCharacters(chars);
              getBlocks(word.length);

              // console.log("Key pressed", key, chars, filledCharacters);
            }}
          />
        </VStack>
      </VStack>
    </VStack>
  );
}
