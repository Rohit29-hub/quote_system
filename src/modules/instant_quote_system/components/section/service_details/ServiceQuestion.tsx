import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../../../redux/store"
import SelectInputField from "../../ui/SelectInputField";
import RadioInputField from "../../ui/RadioInputField";
import ImageQuantityInputField from "../../ui/ImageQuantityInputField";
import { addQuestionAnswer, decrementStep, incrementStep } from "../../../redux/reducers/userAnswerSlice";
import { nextQuestion, previousQuestion } from "../../../redux/reducers/serviceQuestionsSlice";
import { isEmpty } from "../../../helper/helper";
import { useAnswerContext } from "../../../context/CurrentAnswerProvider";

const QuestionComponent = () => {

    // dispatch method for dispatching the actions.
    const dispatch = useDispatch<AppDispatch>();

    // using context for manage state for answer
    const { answers, handleSetQuestionAnswer, setAnswerObjToNull } = useAnswerContext();

    // Using data from [questions_slice] for ask the user

    /**
     *  current_question:- hold the current ask question
     *  question_step_count:- they count the step [example:- 5 question , so they like this: 0, 1, 2,..5]
     *  total_question_length:- total_question that we need to ask the user [additon of all the services quesion]
    */

    const { current_question, question_step_count, total_question_length } = useSelector((state: RootState) => state.instant_quote.questions);

    // This function determine the component for user to select their answer
    const determineAnswerComp = (question_answer_type: string) => {
        switch (question_answer_type) {
            case 'select': return <SelectInputField current_question={current_question!} setAnswer={handleSetQuestionAnswer} />;;
            case 'radio': return <RadioInputField current_question={current_question!} setAnswer={handleSetQuestionAnswer} />;
            case 'image_quantity_input_field': return <ImageQuantityInputField current_question={current_question!} setAnswer={handleSetQuestionAnswer} />
            default: return null
        }
    }

    /** 
     * Method for go to next component.
     * but here i am checking. if questions is ongoing so decrement the question.
     * so, question component change not component.
     * but if the question_step_count is 0 so decrementStep so we can go to next 
     * component.
     * 
    */
    const handlePrevious = () => {
        if (question_step_count == 0) {
            // change the component
            dispatch(decrementStep());
        } else {
            // If question ongoing so change the question
            dispatch(previousQuestion());
        }
    }

    // method for handling next question or next component
    const handleNext = async () => {
        /**
         * question_step_count is not completed all the question.
         * so change the change the question.
         * otherwise change the component.
         */

        if (question_step_count < total_question_length - 1) {
            // if user not filled up the answer so show them alert.
            if (!isEmpty(answers)) {
                await dispatch(addQuestionAnswer(answers)); // add question_answer in question_answer slice
                dispatch(nextQuestion(answers)); // change the question to next
                setAnswerObjToNull(); // change the answer object to null
            } else {
                alert('Please give your answer !');
            }
        } else {
            // increment the step if all the question is asked
            dispatch((incrementStep()));
        }
    }

    return (
        <div className="w-full h-full flex flex-col relative items-center justify-between">
            <div className="w-full flex-1 grid sm:grid-cols-1 sm:grid-rows-2">
                {/* question */}
                <div className="w-full h-auto py-2.5 bg-[#d9edf7] flex flex-col items-center justify-center">
                    {current_question?.question_image && <img className="w-44 h-22" src={current_question.question_image} alt="" />}
                    <p className="text-xl text-[#1C1A5F] font-medium">{"#" + current_question?.question_service_type + " :"}</p>
                    <p className="text-2xl text-[#1C1A5F] text-center font-medium">{current_question?.question_text}</p>
                    {current_question?.question_description && <p className="text-base text-gray-500 text-center">{current_question.question_description}</p>}
                </div>

                {/* for answer */}
                <div className="w-full h-auto flex items-center justify-center">
                    {determineAnswerComp(current_question?.question_answer_type!)}
                </div>
            </div>

            {/* button navigation */}
            <div className="w-full  shrink-0  md:absolute relative sm:bottom-2 h-16  flex items-center px-4">
                <button onClick={handlePrevious} className={`bg-active_stepbar_color absolute left-2 cursor-pointer text-white px-6 py-1.5 rounded-md`}>Back</button>
                <button onClick={handleNext} className={`absolute right-2 bg-active_stepbar_color cursor-pointer text-white px-6 py-1.5 rounded-md`}>Next</button>
            </div>
        </div>
    )
}

export default QuestionComponent