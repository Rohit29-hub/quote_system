import { questionType } from '../../types/service';

interface RadioFieldsProps {
    current_question: questionType,
    setAnswer: (answer: string, questionId: string, serviceId: string, questionType: string, questionText: string, question_type: string, question_label: string) => void;
}

const RadioInputField = ({ current_question, setAnswer }: RadioFieldsProps) => {
    return (
        <div className="w-full h-full flex flex-col gap-3 mt-20 items-center justify-start">
            <p className="text-2xl text-[#1C1A5F] text-center font-medium">{current_question?.question_text}</p>
            <div className="flex gap-x-2 mt-2">
                {current_question?.question_options.map((option: any, id: number) => (
                    <div key={id} className="flex cursor-pointer">
                        <input
                            type="radio"
                            className="w-16"
                            name="radio"
                            id={option.question_label}
                            onChange={() =>
                                setAnswer(
                                    option.question_label.toLowerCase() === 'yes' ? 'Yes' : 'No',
                                    current_question._id!,
                                    current_question.service_id!,
                                    current_question.question_service_type!,
                                    current_question.question_text,
                                    current_question.question_answer_type,
                                    option.question_label
                                )
                            }
                        />
                        <label htmlFor={option.question_label}>{option.question_label}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RadioInputField;
