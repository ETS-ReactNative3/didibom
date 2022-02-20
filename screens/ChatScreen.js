import React, { useCallback, useLayoutEffect, useState } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { auth, db, getUserInfo } from '../firebase/Database'

export default function Chat({route}) {
  const {userImg} = route.params;
  const [messages, setMessages] = useState([]);
  const [DATA, setDATA] = useState(null);

  

  useLayoutEffect(() => {

  
    const collectionRef = db.collection('chats');
    const query = collectionRef.orderBy('createdAt', 'desc');
    console.log(query);

    const unsubscribe = query.onSnapshot((querySnapshot) => {
      setMessages(
        querySnapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
          userImg: doc.data().userImg
        }))
      )
    })

    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previosMessages => GiftedChat.append(previosMessages, messages));
    const {_id, createdAt, text, user} = messages[0];
    const collectionRef = db.collection('chats');
    collectionRef.add({
      _id,
      createdAt,
      text,
      user
    })


  }, [])
  return (
    <GiftedChat
    messages={messages}
    showAvatarForEveryMessage={true}
    onSend={messages => onSend(messages)}
    user={{
      _id: auth?.currentUser?.email,
      avatar: userImg
    }}
    />
  )
}
