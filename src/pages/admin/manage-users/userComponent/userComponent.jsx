import {
  ButtonTextBg,
  ButtonTextNoBgWithBorder,
} from 'components/UI/buttons/buttons';

export default function UserComponent({ user }) {
  return (
    <div key={user.uid} className="grid w-full grid-cols-6 gap-4">
      <span className="py-4">{user.name}</span>
      <span className="py-4">{user.role}</span>
      <span className="py-4">{user.uid}</span>
      <span className="py-4">{user.email}</span>
      <ButtonTextNoBgWithBorder>Edit</ButtonTextNoBgWithBorder>
      <ButtonTextBg>Disable</ButtonTextBg>
    </div>
  );
}
