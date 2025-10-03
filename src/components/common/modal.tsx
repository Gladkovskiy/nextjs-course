'use client'

import {Modal, ModalBody, ModalContent, ModalHeader} from '@heroui/react'
import {ReactNode} from 'react'

interface IProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const CustomModal = ({
  children,
  onClose,
  title,
  size = 'xs',
  isOpen,
}: IProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size}>
      <ModalContent>
        <ModalHeader className=" border-b border-gray-400">
          <h3 className=" text-xl font-semibold text-black">{title}</h3>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CustomModal
