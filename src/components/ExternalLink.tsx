import React from 'react';

type Props = {
  url: string;
  label?: string;
  newWindow?: boolean;
  style?: LinkStyle;
  children?: React.ReactNode;
};

export enum LinkStyle {
  Non,
  SimpleBlue,
}

export const ExternalLink = ({ url, children, newWindow = true, label, style = LinkStyle.Non }: Props) => {
  let styleClasses = '';
  switch (style) {
    case LinkStyle.SimpleBlue:
      styleClasses = 'text-blue-500 hover:underline';
      break;
  }
  return (
    <a
      href={url}
      title={label}
      target={newWindow ? '_blank' : '_self'}
      rel='noreferrer'
      className={styleClasses}
    >
      {children ? children : url}
    </a>
  );
};
