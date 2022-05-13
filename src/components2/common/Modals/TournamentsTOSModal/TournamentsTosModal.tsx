import { WarningModal } from "../WarningModal/WarningModal";
import { useAppDispatch } from "../../../../store/hooks";
import {
  setModal,
  setTOSModal,
  setTournamentsWarningModal,
} from "../../../../store/appSlice";
import { useNavigate } from "react-router-dom";

export const TournamentsTOSModal = () => {
  const dispatch = useAppDispatch();
  const text = [
    "bla",
    "You will not be able to purchase lives during the tournament, only before entering",
    "Test your recording, any entries without a gameplay recording will be voided",
    "You will need to Stake your Squids in order to enter and pay the $DNA fee to participate",
  ];
  const onClose = () => {
    dispatch(setModal(false));
    dispatch(setTOSModal(false));
  };

  const navigate = useNavigate();

  const onAccept = () => {
    navigate("/app2/setup");
    onClose();
  };

  return <WarningModal onClose={onClose} onAccept={onAccept} items={text} />;
};
