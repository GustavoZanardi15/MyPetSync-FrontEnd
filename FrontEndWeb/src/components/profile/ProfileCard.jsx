const ProfileCard = ({
  name,
  category,
  imageUrl,
  clientCount,
  rating,
  reviewCount,
  children,
}) => {
  const avatarText = name ? name.charAt(0).toUpperCase() : "P";
  const isImageValid =
    imageUrl &&
    imageUrl !== "https://placehold.co/128x128/FFBD70/ffffff?text=PET";

  return (
    <div className="bg-[#058789] p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center h-full">
      <div className="w-32 h-32 rounded-full bg-orange-400 overflow-hidden mb-4 border-4 border-white shadow-md flex items-center justify-center">
        {isImageValid ? (
          <img
            src={imageUrl}
            alt={`Logo de ${name}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-6xl font-bold text-white">{avatarText}</span>
        )}
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
          <span className="text-xl font-bold text-teal-300">
            {Number(rating).toFixed(1)}
          </span>
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
