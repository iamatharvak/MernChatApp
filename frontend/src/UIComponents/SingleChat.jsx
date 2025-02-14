import {
  Box,
  Button,
  ButtonSpinner,
  FormControl,
  IconButton,
  Input,
  InputRightElement,
  PopoverHeader,
  PopoverBody,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDimensions,
  useDisclosure,
  useToast,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
} from "@chakra-ui/react";
import { FaFile, FaImage, FaPaperclip, FaVideo } from "react-icons/fa";
import { ChatState } from "../Context/ChatProvider";
import React, { useEffect, useState } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../config/chatLogics";
import ProfileModal from "./miscellaneous/ProfileModal";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import { Spinner } from "@chakra-ui/spinner";
import axios from "axios";
import "./styles.css";
import ScrollableChats from "./miscellaneous/ScrollableChats";
import io from "socket.io-client";
import Lottie from "react-lottie";
import animationData from "../animations/typing.json";

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { user, selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/message/${selectedChat._id}`,
        config
      );
      // console.log(data);
      // console.log(messages);
      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
      // console.log("Joined chat room:", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        // setLoading(true);
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          `http://localhost:5000/api/message`,
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        socket.emit("new message", data); // Emit event
        setMessages([...messages, data]); // Update UI immediately
        setNewMessage(""); // Clear input

        // setLoading(false);
      } catch (error) {
        toast({
          title: "Error Occurred!",
          description: error,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.onAny((event, ...args) => {
      // console.log(`Received event: ${event}`, args);
    });
    socket.emit("setup", user);
    socket.emit("new message", {
      sender: user, // Ensure you send the user who sent the message
      content: newMessage, // The actual message
      chat: selectedChat, // Ensure `selectedChat` is the correct chat object
    });

    // console.log("Emitting new message:", messages);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      // console.log("New message received:", newMessageRecieved);

      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        // Show notification for messages outside the active chat
        setNotification((prev) => [newMessageRecieved, ...prev]);
        setFetchAgain((prev) => !prev);
      } else {
        // Update messages in the current chat
        setMessages((prevMessages) => [...prevMessages, newMessageRecieved]);
      }
    });

    return () => socket.off("message recieved"); // Cleanup
  }, [selectedChatCompare]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      // console.log("nrew message", newMessageRecieved);
      // console.log("hello");
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification((prevNotifications) => [
            newMessageRecieved,
            ...prevNotifications,
          ]);
          setFetchAgain((prev) => !prev);

          setFetchAgain(!fetchAgain);
          // setNotification((prevNotifications) => {
          //   const updatedNotifications = [
          //     newMessageRecieved,
          //     ...prevNotifications,
          //   ];s
          //   localStorage.setItem(
          //     "notifications",
          //     JSON.stringify(updatedNotifications)
          //   );
          //   return updatedNotifications;
          // });
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });
  useEffect(() => {
    // console.log("Notification Updated:", notification);
  }, [notification]);

  useEffect(() => {
    const storedNotifications = JSON.parse(
      localStorage.getItem("notifications")
    );
    if (storedNotifications) {
      setNotification(storedNotifications);
    }
  }, []);

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="sans-serif"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {messages &&
              (!selectedChat.isGroupChat ? (
                <>
                  {getSender(user, selectedChat.users)}
                  <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                  />
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModal
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                    fetchMessages={fetchMessages}
                  />
                </>
              ))}
          </Text>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflow="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChats messages={messages} />
              </div>
            )}
            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  ></Lottie>
                </div>
              ) : (
                <></>
              )}
              <>
                <Input
                  variant="filled"
                  bg=""
                  placeholder="Enter a message..."
                  onChange={typingHandler}
                  value={newMessage}
                />
                <InputRightElement>
                  <Popover placement="top-end">
                    <PopoverTrigger>
                      <IconButton
                        aria-label="Open Attachment Modal"
                        bg=""
                        icon={<FaPaperclip />}
                        // onClick={onOpen}
                      />
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      {/* <PopoverHeader>Select an Option</PopoverHeader> */}
                      <PopoverBody>
                        <HStack>
                          <IconButton icon={<FaFile onClick={onOpen} />} />
                          <IconButton icon={<FaImage onClick={onOpen} />} />
                          {/* <IconButton icon={<FaVideo />} /> */}
                        </HStack>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </InputRightElement>
              </>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Wil be integrated Soon</ModalHeader>
                  <ModalCloseButton />
                </ModalContent>
              </Modal>
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="sans-serif">
            Click on a user to start Chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
