const Modal = ({ open, title, children, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-900 text-lg">{title}</h3>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200"
          >
            ✕
          </button>
        </div>
        <div className="text-gray-700">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
