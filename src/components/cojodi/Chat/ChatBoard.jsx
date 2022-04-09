import React from 'react';

import {ChatEngineWrapper, ChatSocket, ChatFeed} from 'react-chat-engine'

const ChatBoard = () => {
    return (
        <ChatEngineWrapper >
            <ChatSocket
                projectID='7f6f2159-928a-4d60-8fb8-5ec3b3497f6d'
                chatID='109458'
                chatAccessKey='ca-42dce9ab-96b4-499c-a0d1-276e66d1f003'
                senderUsername='John'

            />

            <ChatFeed  activeChat='109458' />

        </ChatEngineWrapper>
        )
}
export default ChatBoard;