import { useDispatch } from "react-redux";
import TopHeading from "../../ui/TopHeading";
import { AppDispatch } from "../../../../../redux/store";
import { addAdditionalMessage, decrementStep, incrementStep } from "../../../redux/reducers/userAnswerSlice";
import { useState } from "react";

const QuoteInputBox = () => {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch<AppDispatch>();

    // Taking additional quote to the user
    const handleQuoteGenerate = () => {
        if (message.trim() == "") {
            alert('Please provide a addition quote');
        } else {
            dispatch(addAdditionalMessage(message)) // add them into the state
            dispatch(incrementStep()); // increment the step
        }
    }

    // Method for go previous component 
    const handlePrevious = () => {
        dispatch(decrementStep());
    }

    return (
        <div className="w-full h-full flex flex-col justify-between">
            <div className="w-full h-auto mt-4 flex flex-col items-center justify-center gap-y-4">
                <TopHeading title="Additional Notes" />
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full rounded-md outline-none border border-gray-800 pl-2" name="additional_note" id="additional_note" cols={30} rows={8}></textarea>
                <button onClick={handleQuoteGenerate} className="px-3 py-2 rounded-md bg-active_stepbar_color text-white">
                    Review my Quote
                </button>
            </div>
            {/* button navigation */}
            <div className="w-full  shrink-0  md:absolute relative sm:bottom-2 h-16  flex items-center px-4">
                <button onClick={handlePrevious} className={`bg-active_stepbar_color absolute left-2 cursor-pointer text-white px-6 py-1.5 rounded-md`}>Back</button>
            </div>
        </div>
    )
}

export default QuoteInputBox