import { questionType } from '../../types/service';

interface SelectInputFieldProps {
    current_question: questionType;
    setAnswer: (answer: string, questionId: string, serviceId: string, questionType: string, questionText: string, question_type: string, question_label: string) => void;
}

const SelectInputField = ({ current_question, setAnswer }:SelectInputFieldProps) => {
    return (
        <>  
            <select
                className="w-full py-1.5 pl-2 border rounded outline-none focus:shadow-md focus:shadow-blue-300"
                name="select"
                onChange={(e) =>
                    setAnswer(
                        e.target.value,
                        current_question._id!,
                        current_question.service_id!,
                        current_question.question_service_type!,
                        current_question.question_text!,
                        current_question.question_answer_type,
                        current_question.question_answer_type
                    )
                }
            >
                <option value={'choose'}>Please choose an option</option>
                {current_question?.question_options.map((option: any) => (
                    <option key={option.question_value} value={option.question_value}>
                        {option.question_label}
                    </option>
                ))}
            </select>
        </>
    );
};

export default SelectInputField;
