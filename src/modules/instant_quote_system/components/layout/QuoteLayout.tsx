import { CurrentAnswerProvider } from "../../context/CurrentAnswerProvider";
import StepperNavigation from "./StepperNavigation";

const QuoteLayout = ({ children }: {
    children: React.ReactNode;
}) => {
    return (
        <CurrentAnswerProvider>
            <div className="w-full h-screen bg-lightblue p-2">
                <div className="md:w-4/5 lg:w-2/4  md:m-auto w-full h-full overflow-hidden flex flex-col shadow-lg relative bg-white rounded-lg p-2 gap-y-2">
                    <div className="w-full h-auto">
                        <StepperNavigation />
                    </div>
                    <div className="flex-1 h-full ">
                        {children}
                    </div>
                </div>
            </div>
        </CurrentAnswerProvider>
    )
}

export default QuoteLayout