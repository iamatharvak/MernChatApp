import { ChatState } from '@/Context/ChatProvider';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react'
import { useState } from 'react'

const MyChats = () => {
  const [loggedUser,setLoggedUser] = useState();
  const [selectedChat,setSelectedChat,user,chats,setChats] = ChatState();
  const toast = useToast();

  const fetchChats = async()=>{
    try {
      const config = {
        headers :{
          Authorization : `Bearer ${user.token}`,
        },
      };

      const {data} = await axios.get("http://localhost:5000/api/chat",config);
      setChats(data);
    } catch (error) {
      toast({
            title: "Error Occured!",
       description: error.message,
        status:"error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
    });
  }
  }


  return (
    <div>
      
    </div>
  )
}

export default MyChats