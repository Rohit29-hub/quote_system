# Welcome To Instant Quote System

This is a small feature of this application.

## Approach (What have I done)

| Step | Approach                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Made all important main components like ServiceSelectComponent, AboutProjectComponent, ServiceComponent, FormComponent, and QuoteComponent.                                                                                                                                                                                                                                                                                                          |
| 2    | I used Redux and created three slices: serviceSlice which manages the service_data, questionsSlice which manages the questions like all the questions and updates the current visible question, how many questions are present, etc., and userAnswerSlice which manages user input data like user_data, about_project_data, selectedService, questions' answers, etc. I am using the variable `step_count` to render components accordingly.<br><br>

````javascript
// Step count, they count all the steps, in this case 6
const { step_count } = useSelector((state: RootState) => state.instant_quote.user_and_answers);

// Total default steps and components that will be visible for the Instant Quote system
const determineComponent = () => {
    switch (step_count) {
        case 0: return <Services />; // Service component for selecting the service [which service quote user wants]
        case 1: return <AboutProject />; // AboutProject for [asking them about their project]
        case 2: return <QuestionComponent />; // QuestionComponent for [showing all questions related to the service]
        case 3: return <UserForm />; // UserForm for [taking user data or personal information]
        case 4: return <QuoteInputBox />; // QuoteInputBox for [taking additional messages from the user]
        case 5: return <ShowQuote />; // Final component that shows [quote of the selected service]
        default: return null;
    }
};
