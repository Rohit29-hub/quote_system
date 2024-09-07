import { combineReducers } from 'redux';
import servicesDataSlice from './reducers/servicesDataSlice';
import questionDataSlice from './reducers/serviceQuestionsSlice'
import userAnswerSlice from './reducers/userAnswerSlice';

const instant_quote = combineReducers({
    services: servicesDataSlice,
    questions: questionDataSlice,
    user_and_answers: userAnswerSlice
});

export default instant_quote;
