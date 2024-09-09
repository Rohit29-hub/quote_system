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