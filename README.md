# Welcome To Instant Quote System

This is a small feature of this application.

## Approach (What have i done)

| Step | Approach              |
|------|-----------------------|
| 1    | Made all important main components like ServiceSelectComponent,AboutProjectComponent, ServiceComponent, and FormComponent, QuoteComponent.  |
| 2    | I used Redux and created three slices: serviceSlice which manages the service_data, questionsSlice which manages the questions like all the questions and updates the current visible question, how many questions are present etc, and userAnswerSlice which manages user input data like user_data, about_project_data, selectedService, questions' answers, and etc. and i am using variable step_count to render component accordingly ``` // Step count they count all the steps in this case 6
    const { step_count } = useSelector((state: RootState) => state.instant_quote.user_and_answers);

    // Total default steps and components. That will be visible for Instant quote system
    const determineComponent = () => {
        switch (step_count) {
            case 0: return <Services />; // Service componenet for select service, [which service quote user want]
            case 1: return <AboutProject />; // AboutProject for [Asking them about their project]
            case 2: return <QuestionComponent />; // QuestionComponent for [showing all the question related to service]
            case 3: return <UserForm />; // UserForm for [taking user data or personal information]
            case 4: return <QuoteInputBox />; // QuoteInputBox for [taking additonal message from the user]
            case 5: return <ShowQuote /> // final components that show [quote of the selected service]
            default: return null
        }
    }; |
| 3    |    |
| 4    | Test and debug         |
| 5    | Deploy the application |
