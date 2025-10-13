const ProfileCard = ({
  name,
  category,
  imageUrl,
  clientCount,
  rating,
  reviewCount,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center h-full">
      <div className="w-32 h-32 rounded-full bg-orange-400 overflow-hidden mb-4 border-4 border-white shadow-md">
        <img
          src={imageUrl}
          alt={`Logo de ${name}`}
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/128x128/FFBD70/ffffff?text=PET";
            e.currentTarget.onerror = null;
          }}
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="text-xl font-bold text-gray-800">{name}</h2>
      <p className="text-sm text-gray-500 mb-6">{category}</p>

      <div className="flex justify-around w-full border-t border-gray-100 pt-4">
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold text-teal-600">{clientCount}</span>
          <span className="text-xs text-gray-500">Clientes</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold text-teal-600">{rating}</span>
          <span className="text-xs text-gray-500">Avaliação</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold text-teal-600">{reviewCount}</span>
          <span className="text-xs text-gray-500">Reviews</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
