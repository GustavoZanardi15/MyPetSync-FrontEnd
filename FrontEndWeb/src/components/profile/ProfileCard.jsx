const ProfileCard = ({
  name,
  category,
  imageUrl,
  clientCount,
  rating,
  reviewCount,
  children,
}) => {
  return (
    <div className="bg-[#058789] p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center h-full">
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
      {children}
      <h2 className="text-xl font-bold text-white">{name}</h2>
      <p className="text-sL text-white mb-6">{category}</p>
      <div className="flex justify-around w-full border-t border-gray-100 pt-4">
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold text-teal-300">{clientCount}</span>
          <span className="text-xL text-white">Clientes</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold text-teal-300">{rating}</span>
          <span className="text-xL text-white">Avaliação</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold text-teal-300">{reviewCount}</span>
          <span className="text-xL text-white">Reviews</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
