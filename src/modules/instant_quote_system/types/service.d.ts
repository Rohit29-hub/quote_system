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
    question_image?: string,
    question_description?: string,
    question_options: {
        question_value: number | string,
        question_label: string,
        question_image?: string
    }[],
    min_quantity: number,
    max_quantity: number,
}


export type questionDataInitialState = {
    questions_data: questionType[] | [],
    total_question_length: number,
    current_question: questionType | null,
    question_step_count: number,
    isLoading: boolean,
    error: any | null
}