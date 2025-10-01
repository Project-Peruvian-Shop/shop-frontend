import { Route, Routes } from "react-router-dom";
import "./Styles/App.css";
import Home from "./Pages/home/Home.tsx";
import AboutCompany from "./Pages/About_company.tsx";
import Shop from "./Pages/Shop.tsx";
import Navbar from "./Components/navbar/Navbar.tsx";
import Footer from "./Components/footer/Footer.tsx";
import { routes } from "./utils/routes.ts";
import Questions_frecuenly from "./Pages/Questions_frecuenly.tsx";
import Policity from "./Pages/Policity.tsx";
import Notfound from "./Pages/Notfound.tsx";
import TermsAndConditions from "./Pages/TermsAndConditions.tsx";
import Contact from "./Pages/Contact.tsx";
import Complaints_book from "./Pages/Complaints_book.tsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/*Principal Pages*/}
        <Route path={routes.NotFound} element={<Notfound />} />
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.about} element={<AboutCompany />} />
        <Route path={routes.questions} element={<Questions_frecuenly />} />
        <Route path={routes.contact} element={<Contact />} />
        <Route path={routes.complaints_book} element={<Complaints_book />} />
        <Route path={routes.tyc} element={<TermsAndConditions />} />
        <Route path={routes.privacy_policy} element={<Policity />} />
        {/*Shop Pages*/}
        <Route path={routes.shop} element={<Shop />} />
      </Routes>
      <Footer />
    </>
  );
}
export default App;
