import { Modal } from "@/shared/ui/Modal"
import { useLoginModal } from "../model"

export const  LoginModal  = () => {
  const {isOpen,close} = useLoginModal()
  return (
 <Modal onClose={close} opened={isOpen}>
   Hi

    </Modal>
  )
}
