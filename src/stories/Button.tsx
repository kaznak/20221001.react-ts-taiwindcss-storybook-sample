import React from 'react';
import './button.css';

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={[
        'inline-block border-2 rounded-3xl leading-none cursor-pointer',
        'font-sans font-bold',
        (primary ?
          'border-sky-400 text-white bg-sky-400' :
          'border-gray-200 text-gray-700 bg-white'
        ),
        {
          small: 'px-4 py-2 text-sm',
          medium: 'px-5 py-2.5 text-base',
          large: 'px-6 py-3 text-lg',
        }[size]
      ].join(' ')}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};
