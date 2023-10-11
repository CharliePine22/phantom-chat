'use client';

import axios from "axios";
import { useEffect, useRef, useState } from "react";

import { pusherClient } from "@/app/libs/pusher";
import useConversation from "@/app/hooks/useConversation";
import MessageBox from "./MessageBox";
import { FullMessageType } from "@/app/types";
import { find } from "lodash";

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages = [] }) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState(initialMessages);
  const [allCoords, setAllCoords] = useState<any[]>([]);
  const [completedElements, setCompletedElements] = useState<any[]>([])
  
  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    if(allCoords.length <= 1 || !messages) return;

    grabPairs(allCoords, 15);
    
  }, [messages, allCoords]);

  useEffect(() => {
    pusherClient.subscribe(conversationId)
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message]
      });
      
      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) => current.map((currentMessage) => {
        if (currentMessage.id === newMessage.id) {
          return newMessage;
        }
  
        return currentMessage;
      }))
    };
  

    pusherClient.bind('messages:new', messageHandler)
    pusherClient.bind('message:update', updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind('messages:new', messageHandler)
      pusherClient.unbind('message:update', updateMessageHandler)
    }
  }, [conversationId]);

  const grabPairs = function (coordsList: any[], thickness: number): void {
    for(let i = 0; i < coordsList.length; i++) {
      let msgbox1 = allCoords[i];
      let msgbox2 = allCoords[i + 1]
      if(!msgbox2) break;
    // bottom center
    var x1 = msgbox1.left + msgbox1.width / 2.2;
    var y1 = msgbox1.top + msgbox1.height;
    // top right
    var x2 = msgbox2.left;
    var y2 = msgbox2.top;
    // distance
    var length = Math.sqrt(((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)));
    // center
    var cx = ((x1 + x2) / 2) - (length / 2.2);
    var cy = ((y1 + y2) / 2) - (thickness / 2);
    // angle
    var angle = Math.atan2((y1-y2),(x1-x2))*(180/Math.PI);
        // make hr
      var htmlLine = "<div style='padding:0px; margin:0px; position:absolute; height:" + thickness + "px; z-index: 1; background-color: black; line-height:1px; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);' />";
      // document.body.innerHTML += htmlLine; 
      setCompletedElements(prev => [...prev, htmlLine]);
    }
  }

  console.log(completedElements)

  return ( 
    <div className="flex-1 overflow-y-auto overflow-x-hidden relative message-body z-10">

      {messages.map((message, i) => (
        <MessageBox 
          isLast={i === messages.length - 1} 
          key={message.id} 
          data={message}
          setCoords={coords => setAllCoords(prevCoords => [...prevCoords, coords])}
        />

      ))}
      {completedElements.map((item) => (
        // <div className="connecting-line" /
        JSON.parse(item)
      ))}
      <div className="pt-1" ref={bottomRef} />
    </div>
  );
}
 
export default Body;