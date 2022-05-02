/* eslint-disable */
import * as React from "react";
import style from "./PlayPage.module.scss";
import { svgIcons } from "../../assets/svg/svgIcons";
import { useState } from "react";
import clsx from "clsx";
import numberButton from "../../assets/png/buttons/numberButton.png";
import { chatItemsDefault, leaderboardCards, playPageTabs } from "./constants";
import { useFormik } from "formik";
import buttonBack from "../../assets/png/buttons/numberButton.png";
import { RecordView } from "../../components/Tournaments/TournamentsNew";
import useChat from "../../components/cojodi/Chat/useChat";

interface IValues {
  message: string;
}

export const PlayPage = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const initialValues: IValues = {
    message: "",
  };

  const onSubmit = (values: IValues) => {
    console.log(values.message);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  const roomId = 1; // Gets roomId from URL
  const { messages, sendMessage } = useChat(roomId); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = React.useState(""); // Message to be sent

  const handleNewMessageChange = (event: any) => {
    setInputTextValue(event.target.value);
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    setInputTextValue("");
    sendMessage(newMessage);
    setNewMessage("");
  };

  //send message when enter is pressed
  const handleKeypress = (e: { keyCode: number }) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleSendMessage();
    }
  };

  const [inputTextValue, setInputTextValue] = useState("");

  // @ts-ignore
  return (
    <div className={style.playPage}>
      <div className={style.inner}>
        <div className={style.left}>
          <div className={style.field}>
            <div className={style.back}>{svgIcons.playPageField}</div>
            <iframe
              frameBorder={0}
              style={{
                width: "100%",
                height: "100%",
                maxHeight: "100%",
                overflow: "hidden",
              }}
              src={"https://catsandghostsgamesquids.on.drv.tw/roads_video/"}
              className={style.frame}
            />
          </div>
          <br />
          <RecordView />
        </div>

        <aside className={style.aside}>
          <div className={style.back}>{svgIcons.playPageAside}</div>
          <div className={style.content}>
            <div className={style.tabs}>
              {playPageTabs.map((tab, index) => (
                <button
                  key={index}
                  className={clsx({
                    [style.tab]: true,
                    [style.tab_current]: index === currentTab,
                  })}
                  onClick={() => setCurrentTab(index)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {currentTab === 0 && (
              <>
                <div className={style.leaderboard}>
                  {leaderboardCards.map(({ address, score }, index) => (
                    <div className={style.leaderboardCard} key={index}>
                      <div className={style.back}>
                        {svgIcons.leaderboardCard}
                      </div>
                      <div className={style.leaderboardCardContent}>
                        <button>
                          <img src={numberButton} alt="" />
                          <p>{index + 1}</p>
                        </button>

                        <div className={style.info}>
                          <p>address</p>
                          <p>{`score: ${score}`}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={style.blur} />
              </>
            )}

            {currentTab === 1 && (
              <>
                <div className={style.chat}>
                  {messages.map((message, i) => (
                    <div key={i} className={style.chatItem}>
                      <div className={style.back}>{svgIcons.chatItemBack}</div>
                      <p className={style.nickname}>{message["senderId"]}</p>
                      <p className={style.message}>{message["body"]}</p>
                    </div>
                  ))}
                </div>

                <div className={style.form}>
                  <div className={style.back}>{svgIcons.chatForm}</div>
                  <div className={style.chatFormContent}>
                    <input
                      onKeyDown={handleKeypress}
                      type="text"
                      value={inputTextValue}
                      placeholder="Write message"
                      onChange={handleNewMessageChange}
                    />
                    <button onClick={handleSendMessage}>
                      <img src={buttonBack} alt="" />
                      {svgIcons.send}
                    </button>
                  </div>
                </div>

                <div className={style.chatBlur} />
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};
