import * as React from "react";
import style from "./PlayPage.module.scss";
import { svgIcons } from "../../assets/svg/svgIcons";
import btn from "../../assets/png/buttons/play/button.png";
import { useState } from "react";
import clsx from "clsx";
import numberButton from "../../assets/png/buttons/numberButton.png";
import { chatItems, leaderboardCards, playPageTabs } from "./constants";
import { useFormik } from "formik";
import buttonBack from "../../assets/png/buttons/numberButton.png";
import { RecordView } from "../../components/Tournaments/TournamentsNew";

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
                  {chatItems.map(({ nickname, message }, index) => (
                    <div key={index} className={style.chatItem}>
                      <div className={style.back}>{svgIcons.chatItemBack}</div>
                      <p className={style.nickname}>{nickname}</p>
                      <p className={style.message}>{message}</p>
                    </div>
                  ))}
                </div>

                <form className={style.form} onSubmit={formik.handleSubmit}>
                  <div className={style.back}>{svgIcons.chatForm}</div>
                  <div className={style.chatFormContent}>
                    <input
                      type="text"
                      placeholder="Write message"
                      {...formik.getFieldProps("message")}
                    />
                    <button type="submit">
                      <img src={buttonBack} alt="" />
                      {svgIcons.send}
                    </button>
                  </div>
                </form>

                <div className={style.chatBlur} />
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};
