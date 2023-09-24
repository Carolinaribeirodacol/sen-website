import { Icon as MDIcon } from '@mdi/react';

type Props = {
  name?: string;
  size?: number;
  className?: string;
};

export const Icon = ({ name = 'mdiHeart', size = 1, ...props }: Props) => {
  const { [name]: iconPath } = require('@mdi/js');

  return <MDIcon path={iconPath} size={size} {...props} />;
};