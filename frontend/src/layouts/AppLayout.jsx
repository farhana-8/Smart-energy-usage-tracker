import Navbar from "../components/Navbar";

const AppLayout = ({ children }) => {
  return (
    <>
      <Navbar showMenu={true} />
      {children}
    </>
  );
};

export default AppLayout;
