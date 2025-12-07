import logo from "../assets/logo.png";
const Dashboard = () => {
    return (
        <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-4">
                <img src={logo} alt="logo" className="w-20 h-20 rounded-full shadow-lg" />
                <p className="text-5xl font-extrabold text-primary tracking-wide">Dashboard</p>
            </div>
        </div>
    );
};

export default Dashboard;


