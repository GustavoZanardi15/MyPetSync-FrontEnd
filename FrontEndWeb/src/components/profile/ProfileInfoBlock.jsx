import { FiEdit } from "react-icons/fi";

const ProfileInfoBlock = ({ title, data = [], editable = false }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-4 border border-gray-100">
      <div className="flex items-center border-b border-gray-200 pb-3 mb-3">
        <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
        {editable && (
          <button
            className="ml-auto p-1 text-teal-600 hover:text-teal-800 transition-colors"
            onClick={() => console.log(`TO DO: Abrir edição para ${title}`)}
            aria-label={`Editar ${title}`}
          >
            <FiEdit className="w-5 h-5" />
          </button>
        )}
      </div>

      <dl className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col">
            <dt className="text-sm font-medium text-gray-500">{item.label}</dt>
            <dd className="text-base font-medium text-gray-900 mt-1">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default ProfileInfoBlock;
