# Welcome To Instant Quote System

This is a small feature of this application.

## Approach (What have I done)

| Step | Approach                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Made all important main components like ServiceSelectComponent, AboutProjectComponent, ServiceComponent, FormComponent, and QuoteComponent.                                                                                                                                                                                                                                                                                                          |
| 2    | I used Redux and created three slices: serviceSlice which manages the service_data, questionsSlice which manages the questions like all the questions and updates the current visible question, how many questions are present, etc., and userAnswerSlice which manages user input data like user_data, about_project_data, selectedService, questions' answers, etc. I am using the variable `step_count` to render components accordingly.         | 
| 3    | All Component render one by one but if `step_count` render the `Question Component`. so question component render each time till the all questions not completed. In this is case, I also using one variable for `question_count` they foucs on questions |
| 4    | When the user has answered all sections and all questions and is on the second last component, and clicks on 'Review My Quote,' I make an API call for the quote data. I also pass data like `selected_service`, `user_data`, `aboutProjectData`,`questions_answer`," |
| 5    | After the data and quote are received, I display them on the quote component |
