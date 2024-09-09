export type serviceDataType = {
    _id: string,
    service_title: string,
    service_image_url: string,
    service_type_is_home: boolean,
}

export type serviceDataInitialState = {
    services_data: null | serviceDataType[],
    isLoading: boolean,
    error: any | null
}

export type questionType = {
    _id: string,
    service_id: string,
    question_text: string,
    question_service_type: string,
    question_answer_type: string,
    next_question_id?: string,
    depends_on_question_id?: string,
    question_image?: string,
    question_description?: string,
    next_questions: questionType[],
    question_options: {
        question_value: number | string,
        question_label: string,
        question_image?: string
    }[],
}


export type questionDataInitialState = {
    questions_data: questionType[] | [],
    total_question_length: number,
    question_history: questionType[],
    current_question: questionType | null,
    question_step_count: number,
    isLoading: boolean,
    dependent_questions_data: questionType[],
    error: any | null
}


export type ImageQuantityInputFieldProps = {
    current_question: questionType;
    setAnswer: (answer: string, questionId: string, serviceId: string, questionType: string, questionText: string, question_type: string,question_label: string) => void;
}


export type RadioFieldsProps = {
    current_question: questionType,
    setAnswer: (answer: string, questionId: string, serviceId: string, questionType: string, questionText: string, question_type: string, question_label: string) => void;
}


export type SelectInputFieldProps = {
    current_question: questionType;
    setAnswer: (answer: string, questionId: string, serviceId: string, questionType: string, questionText: string, question_type: string, question_label: string) => void;
}


export type ServiceCardProps = {
    id: string
    service_image_url: string,
    service_title: string,
    service_type_is_home: boolean,
    isSelected: boolean,
    handleServiceSelection: (id: string) => void
}

export type AnswerContextType = {
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