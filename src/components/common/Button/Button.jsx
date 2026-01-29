export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  return (
    <button
      onClick={onClick}
      data-variant={variant}
      data-size={size}
      className={`relative bg-white ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
