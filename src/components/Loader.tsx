const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 z-50">
      <div className="relative w-40 h-40">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className={`absolute inset-0 ${index === 0 ? 'animate-spin' : 'animate-reverse-spin'}`}
            style={{ animationDuration: `${3 + index}s` }}
          >
            <div 
              className={`w-20 h-20 ${
                index === 0 ? 'bg-gray-700' : index === 1 ? 'bg-white' : 'bg-blue-500'
              } absolute`}
              style={{
                top: index * 10 + '%',
                left: index * 10 + '%',
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
              }}
            />
          </div>
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-white rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
