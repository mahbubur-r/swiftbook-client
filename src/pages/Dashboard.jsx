import logo from "../assets/logo.png";
const Dashboard = () => {
    return (
        <div className="flex flex-col items-center mb-8 w-full">
            <div className="flex flex-col md:flex-row items-center gap-4 text-center">
                <img src={logo} alt="logo" className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-lg" />
                <p className="text-3xl md:text-5xl font-extrabold text-primary tracking-wide">Dashboard</p>
            </div>
        </div>
    );
};

export default Dashboard;


