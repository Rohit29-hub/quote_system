import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../../../redux/store"
import { useEffect } from "react";
import { fetchServiceData } from "../../../redux/reducers/servicesDataSlice";
import { serviceDataType } from "../../../types/service";
import ServiceCard from "../../ui/ServiceCard";
import { handleSelectedService, incrementStep } from "../../../redux/reducers/userAnswerSlice";
import TopHeading from "../../ui/TopHeading";
import { fetchQuestions } from "../../../redux/reducers/serviceQuestionsSlice";

const Services = () => {
    // using services data from servicesSlice store
    const { isLoading, services_data, error } = useSelector((state: RootState) => state.instant_quote.services);
    // using selectedSerice data from user_and_answer redux slice
    const { selectedServices } = useSelector((state: RootState) => state.instant_quote.user_and_answers)

    // dispatch method for disptaching the actions
    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {
        // if service_data is null so call the fetchServiceData asyncThunk method.
        if (!services_data) {
            dispatch(fetchServiceData('/service/v1/get_service'));
        }
    }, [])

    // if services_data request is pending
    if (isLoading) {
        return <p>Loading...</p>
    }

    // if services_data request is rejected
    if (error) {
        return <p>{error}</p>
    }

    // Method or function for go to next component
    const handleNext = () => {
        if (selectedServices.length == 0) { // if user not selected any service.
            alert('Please select a service for quote.')
        } else {
            const params = {
                endpoint: '/service/v1/get_questions', // api endpoint
                data: selectedServices  // passing selectedService ids array 
            }
            dispatch(fetchQuestions(params)); // Call the fetchQuestions asyncThunk
            dispatch(incrementStep()); // increment the step [and component change in app.tsx]
        }
    }

    // method for handle user selected service
    const handleServiceSelection = (id: string) => {
        /** 
         * when the user selected any service,
         * so call the handleSelectedService action from question_and_answer slice .
        */
        dispatch(handleSelectedService(id));
    }

    return (
        <>
            <div className="w-full h-full relative px-1 flex flex-col items-center py-3 justify-between gap-y-5">
                {/* heading component that show the current tab or section */}
                <TopHeading title="Select the services that you are interested in:" />
                {/* showing all the services */}
                <div className="w-full flex-1 overflow-y-auto md:overflow-hidden grid grid-cols-3 sm:grid-cols-4 sm:grid-rows-3 md:grid-cols-5 md:gird-rows-3 gap-4">
                    {
                        services_data && services_data.map((item: serviceDataType) => (
                            // service card [basically using seprate component and passing props]
                            <ServiceCard
                                key={item._id}
                                id={item._id}
                                service_image_url={item.service_image_url}
                                service_title={item.service_title}
                                isSelected={selectedServices.includes(item._id)}
                                handleServiceSelection={handleServiceSelection}
                                service_type_is_home={item.service_type_is_home}
                            />
                        ))
                    }
                </div>
                <div className="w-full mb-10 md:mb-0 md:absolute relative sm:bottom-2 h-16  flex items-center px-4">
                    <button onClick={handleNext} disabled={isLoading} className="absolute right-2 bg-active_stepbar_color cursor-pointer text-white px-6 py-1.5 rounded-md">Next</button>
                </div>
            </div>
        </>
    )
}

export default Services