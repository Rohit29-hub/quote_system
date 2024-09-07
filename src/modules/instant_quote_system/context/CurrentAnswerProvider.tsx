import { createContext, useContext, useState, ReactNode } from 'react';
import { answerType } from '../types/usertype';

// The type of the context
interface AnswerContextType {
    answers: answerType;
    handleSetQuestionAnswer: (
        answer: string | {
            question_label: string,
            question_ans: string
        }[],
        question_id: string,
        service_id: string,
        service_name: string,
        question_text: string,
        question_type: string,
        question_label: string
    ) => void;
    error: boolean;
    setAnswerObjToNull: () => void;
}

const AnswerContext = createContext<AnswerContextType | undefined>(undefined);

export const CurrentAnswerProvider = ({ children }: { children: ReactNode }) => {
    const [answers, setAnswers] = useState<any>({});
    const [error, setError] = useState(false);

    const handleSetQuestionAnswer = (
        answer: string | any,
        question_id: string,
        service_id: string,
        service_name: string,
        question_text: string,
        question_type: string,
        question_label: string
    ) => {
        setError(false);
        setAnswers((prevAnswers: any) => {
            // Check if we already have an answer for this question
            if (prevAnswers && prevAnswers.question_id === question_id) {
                // If it's not a radio type question, handle multiple input fields
                if (question_type !== "radio") {
                    // Go through existing answers and find if the label is already present
                    const updatedAnswerArray = prevAnswers.answer.map(
                        (item: any) => {
                            // If the label exists, update the value
                            if (item.question_label === question_label) {
                                return {
                                    ...item,
                                    question_ans: answer,
                                };
                            }
                            return item;
                        }
                    );

                    // Check if the label was found, if not, add a new one
                    const isLabelExists = updatedAnswerArray.some(
                        (item: any) => item.question_label === question_label
                    );

                    // If the label is not in the array, we push a new object with the label and answer
                    if (!isLabelExists) {
                        updatedAnswerArray.push({
                            question_label: question_label,
                            question_ans: answer,
                        });
                    }

                    // Return the updated answer with the new or updated label
                    return {
                        ...prevAnswers,
                        answer: updatedAnswerArray,
                    };
                } else {
                    // If it's a radio type question, we just update the answer directly (as a string)
                    return {
                        ...prevAnswers,
                        answer: answer,
                    };
                }
            } else {
                // If there's no answer for this question yet, create a new one
                return {
                    question_id,
                    service_id,
                    service_name,
                    question_text,
                    question_type,
                    answer: question_type === "radio"
                        ? answer // If it's a radio type, store answer as a string
                        : [
                            {
                                question_label: question_label, // For other types, store as array of objects
                                question_ans: answer,
                            },
                        ],
                };
            }
        });
    };


    const setAnswerObjToNull = () => {
        setAnswers({});
    }

    return (
        <AnswerContext.Provider value={{ answers, handleSetQuestionAnswer, error, setAnswerObjToNull }}>
            {children}
        </AnswerContext.Provider>
    );
};

export const useAnswerContext = () => {
    const context = useContext(AnswerContext);
    if (!context) {
        throw new Error('useAnswerContext must be used within an AnswerProvider');
    }
    return context;
};
