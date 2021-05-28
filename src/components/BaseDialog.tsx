import React from 'react'

export default function BaseDialog ({ className = '', isOpen, ...props }: any) {
  // const [isModalOpen, setIsModalOpen] = useState(true);
  return (
    <div
      id={props.id}
      className={`${className} offlineDimm ${isOpen ? 'open' : ''}`}
    >
      <dialog open={isOpen}>{props.children}</dialog>
    </div>
  )
}
