import "./wrapper.css";
import Header from "./components/header";
import Footer from "./components/footer";

interface Props {
  children: React.ReactNode;
}

function Wrapper({ children }: Props) {
  return (
    <div className="root-element">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Wrapper;
