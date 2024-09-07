export type userType = {
    firstname: string,
    lastname: string,
    address: string,
    company_name?: string,
    city?: string,
    zip_code: string,
    primary_phone: string,
    alternate_phone?:string,
    email: string
}
export type answerType = {
    question_id: string,
    question_text: string,
    service_id: string,
    question_answer: any,
    service_name: string,
}

export type aboutProjectType = {
    hear_about_us: string,
    project_type: string,
    selected_home: string,
    company_name: string,
    building_size: string
}

export type answerDataInitialStateType = {
    step_count: number,
    user_info: userType | null,
    additional_message: string,
    selectedServices: string[],
    aboutProjectData: aboutProjectType,
    question_answers: answerType[] | null
    quote_data: {
        isLoading: boolean,
        isError: boolean,
        data: null | any
    },
}

export type argsDataType = Omit<answerDataInitialStateType, 'quote_data','step_count'> & {
    endpoint: string;
};