/* eslint-disable */
import * as React from "react";
import style from "./PlayPage.module.scss";
import { svgIcons } from "../../assets/svg/svgIcons";
import { useEffect, useState } from "react";
import clsx from "clsx";
import numberButton from "../../assets/png/buttons/numberButton.png";
import { chatItemsDefault, leaderboardCards, playPageTabs } from "./constants";
import buttonBack from "../../assets/png/buttons/numberButton.png";
import RecordView from "../../components/Tournaments/RecordView";
import useChat from "../../components/cojodi/Chat/useChat";
import axios from "axios";
import { backendEndpoint } from "../../constants";
import {
  fetchGameTutorial,
  fetchLeaderboard,
  fetchTournamentStats,
  requestGameUrl,
  requestSessionId,
  voteHighscore,
} from "../../components/cojodi/BackendCalls/BackendCalls";
import {
  connectWallet,
  getConnectedSignerAddress,
  signMessage,
} from "../../components/cojodi/MetamaskConnection/MetamaskWallet";
import {
  setGameplayModal,
  setGameplayUrl,
  setHighscoreId,
  setLeaderboardModal,
  setNickname,
  setOldHighscore,
  setShowVerifiedButtons,
} from "../../store/appSlice";
import { useAppDispatch } from "../../store/hooks";

export const PlayPage = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const roomId = 1; // Gets roomId from URL
  const { messages, sendMessage } = useChat(roomId); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = React.useState(""); // Message to be sent
  const [gameUrl, setGameUrl] = useState("");
  const [inputTextValue, setInputTextValue] = useState("");
  const [leaderboardCardsArray, setLeaderboardCardsArray] = useState([]);
  const dispatch = useAppDispatch();

  // @ts-ignore
  useEffect(async () => {
    await connectWallet();
    let data = await fetchLeaderboard();

    //todo fetch current game tutorial and set game url
    setGameUrl(await fetchGameTutorial());

    for (let i = 0; i < data.length; i++) {
      data[i]["index"] = i;
      if (data[i]["user"]["addr"] === (await getConnectedSignerAddress())) {
        dispatch(setOldHighscore(data[i]["score"]));
      }
    }
    setLeaderboardCardsArray(data);
  }, []);

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

  const clickPlay = async () => {
    let signedMsg = await signMessage({});
    console.log(signedMsg);
    let session_id = await requestSessionId(signedMsg);
    console.log(`Session ID: ${session_id}`);
    if (session_id === "") {
      return false;
    }

    setGameUrl(backendEndpoint + "/tournament/game/" + session_id);
    return true;
  };

  const destroyGame = async () => {
    setGameUrl("");
  };

  return (
    <div className={style.playPage}>
      <div className={style.inner}>
        <div className={style.left}>
          <div className={style.field}>
            <div className={style.back}>{svgIcons.playPageField}</div>
            <iframe
              frameBorder={0}
              scrolling={"no"}
              style={{
                width: "100%",
                height: "100%",
                maxHeight: "100%",
                overflow: "hidden",
              }}
              src={gameUrl}
              className={style.frame}
            />
          </div>
          <br />
          <RecordView handleClick={clickPlay} destroyGame={destroyGame} />
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
                  {leaderboardCardsArray.map((card) => (
                    <div
                      className={style.leaderboardCard}
                      key={card["user"]["addr"]}
                    >
                      <div className={style.back}>
                        {svgIcons.leaderboardCard}
                      </div>
                      <div className={style.leaderboardCardContent}>
                        <button
                          onClick={() => {
                            console.log(card["link"]);
                            dispatch(setLeaderboardModal(false));
                            dispatch(setGameplayModal(true));
                            dispatch(setNickname(card["user"]["username"]));
                            dispatch(setShowVerifiedButtons(true));

                            dispatch(setHighscoreId(card["id"]));
                            dispatch(setGameplayUrl(card["link"]));
                          }}
                        >
                          <img src={numberButton} alt="" />
                          <p>{card["index"] + 1}</p>
                        </button>

                        <div className={style.info}>
                          <p>{card["user"]["username"]}</p>
                          <p>{`score: ${card["score"]}`}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {currentTab === 1 && (
              <>
                <div className={style.chat}>
                  {messages.map((message, i) => (
                    <div
                      key={i}
                      className={style.chatItem}
                      style={{ overflowY: "scroll", overflowX: "hidden" }}
                    >
                      <div className={style.back}>{svgIcons.chatItemBack}</div>
                      <p className={style.nickname}>{message["nickname"]}</p>
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
