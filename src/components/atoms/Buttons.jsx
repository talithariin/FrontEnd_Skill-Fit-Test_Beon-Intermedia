const OutlineButton = ({ text, className, onClick }) => {
  return (
    <button
      className={`border text-black rounded-3xl px-4 py-2 ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export { OutlineButton };
