const EditBlockIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.862 4.487Zm0 0L19.5 7.125"
    />
  </svg>
);

const ProfileInfoBlock = ({ title, data, editable = false }) => {
  const handleEditClick = () => {
    console.log(`Clicou para editar o bloco: ${title}`);
  };

  return (
    <div className="bg-[#058789] p-6 rounded-xl shadow-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4 border-b pb-3">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        {editable && (
          <button
            onClick={handleEditClick}
            className="text-teal-600 hover:text-teal-800 transition-colors p-1 rounded-full hover:bg-teal-50"
            title={`Editar ${title}`}
          >
            <EditBlockIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {data.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col space-y-1 
              ${item.fullWidth ? "md:col-span-2" : "md:col-span-1"}`}
          >
            <label className="text-sm font-medium text-white">
              {item.label}
            </label>
            {item.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileInfoBlock;
