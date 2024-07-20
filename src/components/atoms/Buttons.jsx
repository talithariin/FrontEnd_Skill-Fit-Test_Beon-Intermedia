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

const BButton = ({ shape, customclass, icon, children, loading, ...props }) => {
  return (
    <button
      className={
        shape
          ? `${customclass}`
          : `rounded-md h-full flex justify-center items-center ${customclass}`
      }
      {...props}
      disabled={loading}
    >
      {loading && <span className="loading-spinner"></span>}
      {icon && <span className="flex justify-center items-center">{icon}</span>}
      {children}
    </button>
  );
};

const ButtonBack = (props) => {
  return (
    <BButton
      customclass="p-2 h-full mr-3 rounded-md bg-primary"
      {...props}
      icon={<i className="bi bi-arrow-left text-white"></i>}
    />
  );
};

const FieldButton = ({ title, ...props }) => {
  return (
    <div
      className="border-dashed border-2 border-primary rounded-md p-4 bg-primary-50 flex justify-center items-center gap-2 cursor-pointer"
      {...props}
    >
      <PlusOutlined className="text-primary" />
      <div className="text-primary">{title}</div>
    </div>
  );
};

export { OutlineButton, BButton, ButtonBack, FieldButton };
