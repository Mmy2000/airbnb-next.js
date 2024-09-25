const SkeletonLoader = () => {
  return (
    <div className="animate-pulse max-w-[1200px] mx-auto px-6 pb-6">
      <div className="w-full h-[64vh] mb-4 bg-gray-300 rounded-xl"></div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="py-6 pr-6 col-span-3">
          <div className="h-8 mb-4 bg-gray-300 rounded-lg"></div>
          <div className="h-6 w-1/3 bg-gray-300 mb-6"></div>
          <div className="h-4 bg-gray-300 mb-4"></div>
          <div className="h-4 bg-gray-300 mb-4"></div>
          <div className="h-4 bg-gray-300 mb-6"></div>
          <div className="h-12 bg-gray-300 mb-6"></div>
        </div>
        <div className="py-6 pr-6 col-span-2">
          <div className="h-72 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};
 export default SkeletonLoader;