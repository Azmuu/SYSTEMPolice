import NavSide from "../components/NavSIde";

function Dashboard() {
  return (
    <div className="pt-20 px-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-700 dark:text-blue-300">
        Welcome to the Dashboard!
      </h1>
      <NavSide />
    </div>
  );
}

export default Dashboard;

