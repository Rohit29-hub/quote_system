import { useSelector } from "react-redux"
import QuoteLayout from "./modules/instant_quote_system/components/layout/QuoteLayout"
import AboutProject from "./modules/instant_quote_system/components/section/general_info/AboutProject"
import Services from "./modules/instant_quote_system/components/section/general_info/Services"
import { RootState } from "./redux/store"
import QuestionComponent from "./modules/instant_quote_system/components/section/service_details/ServiceQuestion"
import UserForm from "./modules/instant_quote_system/components/section/general_info/UserForm"
import QuoteInputBox from "./modules/instant_quote_system/components/section/get_quote/QuoteInputBox"
import ShowQuote from "./modules/instant_quote_system/components/section/get_quote/ShowQuote"

const App = () => {
  // Step count they count all the steps in this case 6
  const { step_count } = useSelector((state: RootState) => state.instant_quote.user_and_answers);

  // Total default steps and components. That will be visible for Instant quote system
  const determineComponent = () => {
    switch (step_count) {
      case 0: return <Services />; // Service componenet for select service, [which service quote user want]
      case 1: return <AboutProject />; // AboutProject for [Asking them about their project]
      case 2: return <QuestionComponent />; // QuestionComponent for [showing all the question related to service]
      case 3: return <UserForm />; // UserForm for [taking user data or personal information]
      case 4: return <QuoteInputBox />; // QuoteInputBox for [taking additonal message from the user]
      case 5: return <ShowQuote /> // final components that show [quote of the selected service]
      default: return null
    }
  };

  return (
    <QuoteLayout>
      {/* determineComponent function check the which component should be render */}
      {determineComponent()}
    </QuoteLayout>
  )
}

export default App