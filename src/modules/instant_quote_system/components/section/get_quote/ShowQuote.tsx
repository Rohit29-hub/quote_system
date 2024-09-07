import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../../../redux/store"
import { fetchInstantQuote } from "../../../redux/reducers/userAnswerSlice";
import QuoteCard from "../../ui/QuoteCard";
import { Service } from "../../../types/quote";

const ShowQuote = () => {
  // using quote_data and user_info, selectedServices and many more if needed from user_and_answers slice
  const { quote_data, user_info, selectedServices , question_answers,aboutProjectData} = useSelector((state: RootState) => state.instant_quote.user_and_answers);
  const disptach = useDispatch<AppDispatch>();

  // Calling the fetchInstantQuote async thunk to get the quote and pass the user info and question's answer
  useEffect(() => {
    if (!quote_data.data) {
      disptach(fetchInstantQuote({
        selectedServices, // selected services
        user_info, // user_information
        question_answers, // questions's answer
        aboutProjectData, // user project info like home size, company,comapany size
        endpoint: '/service/v1/get_quotes' // api endpoint
      }))
    }
  }, [])

  if (quote_data.isLoading) {
    return <p>Loading..</p>
  }

  if (quote_data.isError) {
    return <p>Error occur</p>
  }

  return quote_data.data && (
    <div className="w-full h-full flex flex-col gap-y-4 items-center">
      {/* userinfo */}
      {
        <div className="w-full h-auto flex flex-col items-center gap-y-1">
          <h1 className="text-black text-xl">{user_info?.firstname + " " + user_info?.lastname}</h1>
          <p className="text-sm">{user_info?.email}</p>
        </div>
      }
      {/* quotes */}
      {quote_data.data.map((service: Service, index: number) => (
        <div key={index} className="w-full h-full p-2 flex flex-col items-center">
          <div className="w-full h-auto flex flex-col items-center gap-y-2">
            <h2 className="text-2xl font-bold mb-4">{service.service_name}</h2>
            <p className="text-gray-600 mb-4">{service.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.quote.map((quote, index) => (
              <QuoteCard key={index} quote={quote} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ShowQuote