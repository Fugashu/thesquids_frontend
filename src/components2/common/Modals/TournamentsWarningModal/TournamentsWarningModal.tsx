import {WarningModal} from "../WarningModal/WarningModal";
import {useAppDispatch} from "../../../../store/hooks";
import {setModal, setTournamentsWarningModal} from "../../../../store/appSlice";
import {useNavigate} from "react-router-dom";

export const TournamentsWarningModal = () => {
    const dispatch = useAppDispatch();

    const onClose = () => {
        dispatch(setModal(false));
        dispatch(setTournamentsWarningModal(false));
    }

    const navigate = useNavigate();

    const onAccept = () => {
        navigate('/app2/tournaments');
        onClose();
    }

    return (
        <WarningModal onClose={onClose} onAccept={onAccept}/>
    )
}