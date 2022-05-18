import { createPortal } from 'react-dom';

// https://www.youtube.com/watch?v=xaiE_K32gBE&ab_channel=abhikb
export default function ModalWrapper({ children, isOpen }) {
    return (isOpen ? createPortal(children, document.querySelector('#modalWrapper')) : null);
}