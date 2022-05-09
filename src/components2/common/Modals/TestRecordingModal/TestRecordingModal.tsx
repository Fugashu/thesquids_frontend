import * as React from "react";
import style from "./TestRecordingModal.module.scss";
import { useRef, useState } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { setModal, setTestRecordingModal } from "../../../../store/appSlice";
import { useOutsideClick } from "../../../../hooks/useOutsideClick";
import { CloseButton } from "../CloseButton/CloseButton";
import clsx from "clsx";

import modal from "../../../../assets/png/modal/test recording.png";
import workingIcon from "../../../../assets/png/icons/working.png";
import notWorkingIcon from "../../../../assets/png/icons/not working.png";
import { ButtonCustom } from "../../ButtonCustom/ButtonCustom";

import imgDefault from "../../../../assets/png/buttons/test recording modal/default.png";
import imgHover from "../../../../assets/png/buttons/test recording modal/hover.png";
import imgClick from "../../../../assets/png/buttons/test recording modal/click.png";
import { useReactMediaRecorder } from "react-media-recorder";
import { wait } from "@testing-library/user-event/dist/utils";

export const TestRecordingModal = () => {
  const {
    //status,
    startRecording,
    stopRecording,
    //mediaBlobUrl,
  } = useReactMediaRecorder({
    screen: true,
    video: true,
    //TODO wieder rein onStop: (blobUrl, blob) => saveFile(blobUrl, blob),
  });
  const ref = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(setModal(false));
    dispatch(setTestRecordingModal(false));
  };

  useOutsideClick(ref, onClose);

  const [test, setTest] = useState(false);
  const [working, setWorking] = useState(true);

  const onTestHandler = async () => {
    try {
      startRecording();
      await wait(10000);
      stopRecording();
    } catch (e) {
      setTest(true);
      setWorking(false);
    }
    setTest(true);
    setWorking(true);
  };

  return (
    <div className={style.testRecordingModal}>
      <div className={style.content} ref={ref}>
        <CloseButton onClick={onClose} className={style.closeButton} />

        <img className={style.back} src={modal} alt="" />

        <p className={style.title}>Test recording</p>

        <p className={style.description}>
          Press the Test Button and share any of your screens. Your screen will
          be recorded for 10 seconds. Wait until you get a notification if the
          recording worked or not. The video will NOT be uploaded.
        </p>

        <ButtonCustom
          className={style.testBtn}
          onClick={onTestHandler}
          widthMobile={436}
          heightMobile={75}
          widthDesktop={436}
          heightDesktop={75}
          imgMobileDefault={imgDefault}
          imgMobileClick={imgClick}
          imgDesktopDefault={imgDefault}
          imgDesktopHover={imgHover}
          imgDesktopClick={imgClick}
        >
          <p>test</p>
        </ButtonCustom>

        <div className={style.statusBox}>
          <div
            className={clsx({
              [style.item]: true,
              [style.item_show]: test && working,
            })}
          >
            <img className={style.icon} src={workingIcon} alt="" />
            <p>working</p>
          </div>
          <div
            className={clsx({
              [style.item]: true,
              [style.item_show]: test && !working,
            })}
          >
            <img className={style.icon} src={notWorkingIcon} alt="" />
            <p>not working</p>
          </div>
        </div>
      </div>
    </div>
  );
};
