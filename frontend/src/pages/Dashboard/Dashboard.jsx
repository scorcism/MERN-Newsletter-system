import MainSectionWrapper from "../../components/Wrappers/MainSectionWrapper";
import SideBarWrapper from "../../components/Wrappers/SideBarWrapper";
import SideBar from "../../components/SideBar";
import APIs from "../../components/Dashboard/APIs/APIs";
import Audience from "../../components/Dashboard/Audience/Audience";
import AudienceType from "../../components/Dashboard/AudienceType/AudienceType";
import Contacts from "../../components/Dashboard/Contacts/Contacts";
import SendNewsLetters from "../../components/Dashboard/SendNewsLetters/SendNewsLetters";
import { useSelector } from "react-redux";
import Home from "../../components/Dashboard/Home/Home";
import Alert from "../../components/CommonComponents/Alert";

const Dashboard = () => {
  const toRender = useSelector((state) => state.components.toRender);

  return (
    <div className="flex bg-[#595F72] h-[92vh] w-[100vw]">
      <SideBarWrapper>
        <SideBar />
      </SideBarWrapper>
      <MainSectionWrapper>
        {toRender.home && <Home />}
        {toRender.apis && <APIs />}
        {toRender.audience && <Audience />}
        {toRender.audience_type && <AudienceType />}
        {toRender.contacts && <Contacts />}
        {toRender.send_news_letters && <SendNewsLetters />}
      </MainSectionWrapper>
      <Alert />
    </div>
  );
};

export default Dashboard;
