import Icon from './Icon';

interface BinaryIconProps {
  condition?: boolean;
}

const BinaryIcon = ({ condition }: BinaryIconProps) => {
  return condition ? (
    <Icon.True color="success" />
  ) : (
    <Icon.False color="error" />
  );
};

export default BinaryIcon;
