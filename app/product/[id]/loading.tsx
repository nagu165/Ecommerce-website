import Skeleton from "react-loading-skeleton";

function LoadingPage() {
  return (
    <div className="flex flex-col items-center p-5 md:p-12 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Loading Data from MyStore...</h2>
      
      <Skeleton count={1} height={30} width={300} className="mb-4" />

      <div className="flex flex-col md:flex-row justify-center items-center md:items-start md:justify-start md:p-10 pl-0 m-5 ml-0">
        <Skeleton width={400} height={350} className="rounded-lg shadow-md mb-5 md:mb-0" />
        <div className="flex flex-col ml-0 md:ml-5">
          <Skeleton width={300} height={25} className="mb-3 rounded" />
          <Skeleton width={250} height={20} className="mb-3 rounded" />
          <Skeleton width={200} height={20} className="mb-3 rounded" />
          <Skeleton width={600} height={100} className="mb-3 rounded" />
          <Skeleton count={3} height={20} className="mb-2 rounded" />
        </div>
      </div>
    </div>
  );
}

export default LoadingPage;