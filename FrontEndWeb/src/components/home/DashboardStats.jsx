const StatCard = ({ title, value, subText, icon: Icon, iconColor }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between border border-gray-100">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-500">{title}</p>

        <p className="text-3xl font-extrabold text-gray-900 mt-1">{value}</p>

        <p className={`text-xs mt-1 font-semibold ${iconColor}`}>{subText}</p>
      </div>

      <div
        className={`p-3 rounded-full bg-opacity-10 ${iconColor.replace(
          "text-",
          "bg-"
        )}`}
      >
        {Icon && <Icon className={`w-8 h-8 ${iconColor}`} />}
      </div>
    </div>
  );
};

const DashboardStats = ({ stats }) => {
  if (!stats || stats.length === 0) return null;

  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>
    </section>
  );
};

export default DashboardStats;
