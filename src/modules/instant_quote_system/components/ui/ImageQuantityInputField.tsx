import { questionType } from '../../types/service';

interface ImageQuantityInputFieldProps {
    current_question: questionType;
    setAnswer: (answer: string, questionId: string, serviceId: string, questionType: string, questionText: string, question_type: string,question_label: string) => void;
}

const ImageQuantityInputField = ({ current_question, setAnswer }: ImageQuantityInputFieldProps) => {
    return (
        <>
            <div
                className={`w-full h-full grid gap-2 mt-4 ${current_question?.question_options.length === 1
                    ? 'grid-cols-1'
                    : current_question?.question_options.length === 2
                        ? 'sm:grid-cols-2'
                        : 'sm:grid-cols-3'
                    }`}
            >
                {current_question?.question_options.map((option: any) => (
                    <div key={option.question_label} className="col-span-1 bg-home_bg shadow-inner border w-full h-full flex rounded flex-col gap-y-2 items-center py-2 justify-center">
                        <p>{option.question_label}</p>
                        <img className="w-44 h-24" src={option.question_image} alt={option.question_label} />
                        <div className="flex w-full items-center justify-center">
                            <input
                                min={0}
                                defaultValue={option.question_value}
                                className="w-20 p-1 text-center rounded-tl rounded-bl border border-gray-600 outline-none focus:shadow focus:shadow-blue-400"
                                type="number"
                                name={option.question_label}
                                id={option.question_label}
                                onChange={(e) =>
                                    setAnswer(
                                        e.target.value,
                                        current_question._id!,
                                        current_question.service_id!,
                                        current_question.question_service_type!,
                                        current_question.question_text,
                                        current_question.question_answer_type,
                                        option.question_label
                                    )
                                }
                            />
                            <span className="text-base uppercase rounded-tr rounded-br border-l-transparent border p-1 border-gray-600">qty</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ImageQuantityInputField;
