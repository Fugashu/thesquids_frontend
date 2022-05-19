import { WarningModal } from "../WarningModal/WarningModal";
import { useAppDispatch } from "../../../../store/hooks";
import {
  setModal,
  setTournamentsWarningModal,
} from "../../../../store/appSlice";
import { useNavigate } from "react-router-dom";

export const TournamentsWarningModal = () => {
  const dispatch = useAppDispatch();
  const text = [
    "Make sure to read our TOS and policy before entering the tournaments",
    "WATCH OUR TUTORIAL. If you do not follow the exact steps your entry might become invalid.",
    "Test your recording, any entries without a gameplay recording will be voided",
    "You need to use Google Chrome or Edge.",
  ];
  const onClose = () => {
    dispatch(setModal(false));
    dispatch(setTournamentsWarningModal(false));
  };

  const navigate = useNavigate();

  const onAccept = () => {
    navigate("/app2/play");
    onClose();
  };

  return <WarningModal onClose={onClose} onAccept={onAccept} items={text} />;
};
