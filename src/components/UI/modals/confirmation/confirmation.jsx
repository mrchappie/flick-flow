import { ButtonTextBg } from 'components/UI/buttons/buttons';
import { Heading2 } from 'components/UI/heading/heading';

export default function Confirmation({
  title,
  subTitle,
  confirmText,
  cancelText,
  onConfirm,
  closeModal,
}) {
  return (
    <div className="p-4 center-col">
      <Heading2 title={title} />
      <p className="text-xl font-semibold text-black">{subTitle}</p>
      <div className="gap-4 center">
        <ButtonTextBg handleClick={onConfirm} title={confirmText} />
        <ButtonTextBg
          handleClick={closeModal}
          title={cancelText}
          customStyle={'bg-green-500 border-green-500 text-black'}
        />
      </div>
    </div>
  );
}
