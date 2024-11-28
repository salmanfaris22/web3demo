import React, { useEffect, useRef, useState } from "react";
import OverviewCard from "../../components/OverviewCard/OverviewCard";
import classes from "./Gpt.module.scss";
import {
  sendMessage,
  trendingQuestions,
  fetchHistory,
} from "../../../../../services/gpt";
import { useDispatch } from "react-redux";
import { showToast } from "../../../../../store/toastSlice";

const Gpt = () => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState<any>([]);
  const [enquired, setEnquired] = useState<any>([]);
  const [history, setHistory] = useState<any>([]);
  const [chatStarted, setChatStarted] = useState<boolean>(false);
  const [inputText, setInputText] = useState("");
  const [sending, setSending] = useState(false);
  const [typing, setTyping] = useState(false);
  const chatWindowRef = useRef(null);
  const intervalId = useRef<any>();

  useEffect(() => {
    if (!typing) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    getTrendingQuestionMethod();
    fetchHistoryMethod();
  }, []);

  const scrollToBottom = () => {
    if (chatWindowRef.current) {
      const element = chatWindowRef.current as HTMLDivElement;
      element.scrollTop = element.scrollHeight;
    }
  };

  const handleSendMessage = (message?: string) => {
    if (typing) {
      clearInterval(intervalId.current);
      setSending(false);
      setTyping(false);
      return;
    }
    if (!chatStarted) {
      setChatStarted(true);
    }
    if (inputText.trim() !== "" || message) {
      sendMessageMethod(message);
    }
  };

  const sendMessageMethod = async (message?: string) => {
    try {
      setMessages([
        ...messages,
        { type: "outgoing", text: message ? message : inputText },
      ]);
      setInputText("");
      const data = {
        message: message ? message : inputText,
      };
      setSending(true);
      const response = await sendMessage(data);
      if (response.data && response.data.response_message) {
        typeMessage(response.data.response_message);
      }
    } catch (err) {
    } finally {
      setSending(false);
    }
  };

  const getTrendingQuestionMethod = async () => {
    try {
      const response = await trendingQuestions();
      if (response.status) {
        setEnquired(response.data);
        console.log(response.data);
      }
    } catch (err) {
    } finally {
    }
  };

  const fetchHistoryMethod = async () => {
    try {
      const response = await fetchHistory();
      if (response.status) {
        const messageArray: any = [];
        setHistory(response.data);
        response.data.forEach((messages: any) => {
          messageArray.push({
            type: "outgoing",
            text: messages.request_message,
          });
          messageArray.push({
            type: "incoming",
            text: messages.response_message,
          });
        });
        setMessages(messageArray);
      }
    } catch (err) {
    } finally {
    }
  };

  const typeMessage = (text: string) => {
    let index = 0;
    setTyping(true);
    setMessages((prev: any) => [...prev, { type: "incoming", text: "" }]);
    setTimeout(() => {
      scrollToBottom();
    }, 100);
    intervalId.current = setInterval(() => {
      setMessages((prev: any) => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage.type === "incoming") {
          lastMessage.text = text.slice(0, index + 1);
        }
        return newMessages;
      });

      index++;
      if (index === text.length) {
        clearInterval(intervalId.current);
        setSending(false);
        setTyping(false);
      }
    }, 50);
  };

  return (
    <div className={classes.gptWrap}>
      <OverviewCard type="fullHeight">
        <div className={classes.gptInner}>
          <div className={classes.head}>EXDEX GPT</div>
          <div className={classes.des}>
            Welcome to TradeGPT, your personal AI investment assistant. Need
            suggestions about hot coins, market trends, trading strategies,
            technical analysis? I'm here to help! I'll guide you with technical
            and market insights based on EDEX's data.
          </div>

          <div className={classes.chatOuter}>
            <div className={classes.chatInOut}>
              {!chatStarted && (
                <div className={classes.enquiries}>
                  {enquired.map((item: any) => (
                    <div
                      className={classes.enquiryItem}
                      key={item.message}
                      onClick={() => {
                        setInputText(item.message);
                        handleSendMessage(item.message);
                      }}
                    >
                      {item.message}
                    </div>
                  ))}
                </div>
              )}

              {chatStarted && (
                <div className={classes.chatWindow} ref={chatWindowRef}>
                  {messages.map((message: any, index: number) => (
                    <div
                      key={index}
                      className={`${classes.message} ${
                        message.type === "incoming"
                          ? classes.incoming
                          : classes.outgoing
                      }`}
                    >
                      <div className={classes.messageInner}>{message.text}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className={classes.inputWrap}>
              {sending && (
                <div className={classes.typingAnimation}>typing...</div>
              )}
              <input
                type="text"
                placeholder="Ask me anything about the crypto markets..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                disabled={sending}
              />
              <div
                className={classes.send}
                onClick={() => {
                  handleSendMessage();
                }}
              >
                {typing ? (
                  "Stop"
                ) : (
                  <>
                    Send <img src="/assets/images/send.png" alt="send" />
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={classes.disclaimer}>
            <div>Disclaimer</div>
            <ol>
              <li>
                TradeGPT is an artificial intelligence (AI) bot based on the
                GPT-3.5 model and its responses are not affiliated with or
                endorsed by Exdex.
              </li>
              <li>
                Any investment-related advice provided by TradeGPT should not be
                considered as Exdex's official recommendation or guidance.
              </li>
              <li>
                For inquiries or support related to Bybit's business, products,
                or services, kindly reach out to Bybit's Customer Support team.
              </li>
              <li>
                Users are advised to adhere to local laws and regulations when
                engaging in any discussions or sharing content within the chat
                platform.
              </li>
            </ol>
          </div>
        </div>
      </OverviewCard>
    </div>
  );
};

export default Gpt;
