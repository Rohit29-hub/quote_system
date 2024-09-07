import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../../../redux/store"
import { fetchInstantQuote } from "../../../redux/reducers/userAnswerSlice";

const ShowQuote = () => {
  const { quote_data } = useSelector((state: RootState) => state.instant_quote.user_and_answers);
  const disptach = useDispatch<AppDispatch>();

  const {
    user_info,
    additional_message,
    aboutProjectData,
    selectedServices,
    question_answers
  } = useSelector((state: RootState) => state.instant_quote.user_and_answers);

  useEffect(() => {
    if (!quote_data.data) {
      disptach(fetchInstantQuote({
        user_info,
        additional_message,
        aboutProjectData,
        selectedServices,
        question_answers,
        endpoint: '/quote/get_quotes'
      }))
    }
  }, [])

  if (quote_data.isLoading) {
    return <p>Loading..</p>
  }

  if (quote_data.isError) {
    return <p>Error occur</p>
  }

  return (
    <div>
      {JSON.stringify(quote_data.data, null, 2)}
    </div>
  )
}

export default ShowQuote