import { useState, useEffect, useRef } from "react";
import "./MobileUI.scss";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../assets/icons.ts";
import useLocalStorage from "../../hooks/useLocalStorage.ts";


function MobileUI() {



  const [userInput, setUserInput] = useState("");
  const [userId, setUserId] = useState(2344);
  const chatbotConversationRef = useRef(null);
  const [messageLoading, setMessageLoading] = useState(false);


  const [contact, setContact] = useState({
    name: "John Doe",
    subtitle: "Online",
    avatar: "/images/contact-avatar.png",
  });




const textMessages = [
  { message: "Hey, how are you?", sender: "sender" },
  { message: "I'm good! Just finished work.", sender: "user" },
  { message: "That's great! How was your day?", sender: "sender" },
  { message: "It was busy, but productive. How about yours?", sender: "user" },
  { message: "Mine was quite relaxing. I took a day off.", sender: "sender" },
  { message: "Lucky you! I could use a break too.", sender: "user" },
  { message: "You should definitely take some time off.", sender: "sender" },
  { message: "I'll consider it. Thanks!", sender: "user" },
  { message: "No problem. Let me know if you need any suggestions.", sender: "sender" },
  { message: "Sure, I'll keep that in mind. Thanks!", sender: "user" },
];
  const [chatHistory, setChatHistory] = useState(textMessages);


  function handleSubmit(e: any) {
    e.preventDefault();

    const chatObject = {
      message: userInput,
      sender: "user",
    }
    setChatHistory([...chatHistory, chatObject]);
  }



  function handleClear() {
    setChatHistory([]);
  }

  function fetchReply() {

  }


  function renderConversationFromDb() {
    setChatHistory(textMessages);
  }

  useEffect(() => {

  }, []);


  useEffect(() => {
    const conversationContainer: any = chatbotConversationRef.current;
    if (conversationContainer) {
      conversationContainer.scrollTop = conversationContainer.scrollHeight;
    }
  }, [chatHistory]);




  return (
    <div className="MobileUI">
      <section className="chatbot-container">
        <div className="chatbot-header">
          <img src={contact.avatar} className="logo" />
          <h1>{contact.name}</h1>
          <h2>{contact.subtitle}</h2>
          <p className="supportId">User ID: {userId}</p>
          <button className="clear-btn" id="clear-btn" onClick={handleClear}>
            Clear
          </button>
        </div>

        <div
          className="chatbot-conversation-container"
          id="chatbot-conversation"
          ref={chatbotConversationRef}
        >
          {chatHistory.map((speechBubble) => {
            return (
              <div
                key={nanoid()}
                className={`speech speech-${
                  speechBubble.sender === "user" ? "user" : "sender"
                }`}
              >
                {speechBubble.message}
              </div>
            );
          })}
          {messageLoading && (
            <div className="speech-ai speech-loading">
              <div className="loading">
                <div className="dot one"></div>
                <div className="dot two"></div>
                <div className="dot three"></div>
              </div>
            </div>
          )}
        </div>
        <form
          id="form"
          className="chatbot-input-container"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            name="user-input"
            type="text"
            id="user-input"
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
            required
          />
          <button id="submit-btn" className="submit-btn" type="submit">
            <FontAwesomeIcon
              className="send-btn-icon"
              icon={icons.faPaperPlane}
            />
          </button>
         
        </form>
      </section>
    </div>
  );
}

export default MobileUI;
