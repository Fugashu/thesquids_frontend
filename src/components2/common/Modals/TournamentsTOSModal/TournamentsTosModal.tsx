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
    "The Squids are not responsible for any losses occurred during the tournaments ",
    "Cheating and exploits (intentional / unintentional) are forbidden and will result in a ban from the occurring tournament and a blacklist of your address / discord id",
    "We reserve the right to disqualify a player during a tournament at any point in time at our own discretion",
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
