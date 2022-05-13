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
    "You will not be able to purchase lives during the tournament, only before entering",
    "Test your recording, any entries without a gameplay recording will be voided",
    "You will need to Stake your Squids in order to enter and pay the $DNA fee to participate",
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
