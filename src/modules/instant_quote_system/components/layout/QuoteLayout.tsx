import { CurrentAnswerProvider } from "../../context/CurrentAnswerProvider";
import StepperNavigation from "./StepperNavigation";

const QuoteLayout = ({ children }: {
    children: React.ReactNode;
}) => {
    return (
        <CurrentAnswerProvider>
            <div className="w-full h-screen bg-lightblue sm:p-4 sm:px-6 px-1">
                <div className="md:w-4/5 lg:w-2/4 h-full overflow-hidden shadow-lg m-auto relative bg-white rounded-lg p-2">
                    <div>
                        <StepperNavigation />
                    </div>
                    <div className="w-full h-full p-3">
                        {children}
                    </div>
                </div>
            </div>
        </CurrentAnswerProvider>
    )
}

export default QuoteLayout