import "./page.css";
import Header from "./components/header";
import Footer from "./components/footer";

interface Props {
  children: React.ReactNode;
}

function Page({ children }: Props) {
  return (
    <div className="root-element" data-testid="root-element">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Page;
