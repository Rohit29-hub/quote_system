import { FormProvider, useForm } from "react-hook-form";
import InputField from "../../ui/InputField";
import { userType } from "../../../types/usertype";
import TopHeading from "../../ui/TopHeading";
import { addUsersInfo, decrementStep, incrementStep } from "../../../redux/reducers/userAnswerSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../../../common_service/zodSchema";
import { useEffect } from "react";

const UserForm = () => {

    // Get user info from the Redux store
    const { user_info } = useSelector((state: RootState) => state.instant_quote.user_and_answers);
    const dispatch = useDispatch<AppDispatch>();

    // Initialize react-hook-form methods with validation schema
    const methods = useForm<userType>({
        resolver: zodResolver(formSchema),
        defaultValues: user_info || {}, // Initialize form with user_info if it exists
    });

    // Watch for changes in the form data
    const watchedFields = methods.watch(); // Watching all form fields

    // Function to handle 'Previous' button click
    const handlePrevious = () => {
        dispatch(decrementStep());
    };

    // Function to handle 'Next' button click and submit form data
    const handleNext = (data: userType) => {
        if (!user_info) {
            // Dispatch action to store user info if not already available
            dispatch(addUsersInfo(data));
        }
        dispatch(incrementStep());
    };

    // Effect to update Redux store when form data changes
    useEffect(() => {
        if (user_info) {
            // Dispatch the updated form data to the Redux store
            dispatch(addUsersInfo(watchedFields));
        }
    }, [watchedFields, dispatch, user_info]);

    return (
        <div className="w-full h-full flex relative flex-col items-center justify-start">
            <TopHeading title={"General Information"} />

            {/* form components */}
            <FormProvider {...methods}>
                <form className='w-full flex-1 grid grid-cols-2 gap-4 p-4'>
                    <InputField name="firstname" placeholder="First Name *" />
                    <InputField name="lastname" placeholder="Last Name *" />
                    <InputField name="address" placeholder="Street Address *" />
                    <InputField
                        name="city"
                        placeholder="City, State *"
                        type="select"
                        options={[
                            { value: '', label: 'City, State *' },
                            { value: 'AP', label: 'Andhra Pradesh' },
                            { value: 'AR', label: 'Arunachal Pradesh' },
                            { value: 'AS', label: 'Assam' },
                            { value: 'BR', label: 'Bihar' },
                            { value: 'CH', label: 'Chandigarh' },
                            { value: 'CT', label: 'Chhattisgarh' },
                            { value: 'DL', label: 'Delhi' },
                            { value: 'MU', label: 'Mumbai' },
                            { value: 'GA', label: 'Goa' },
                            { value: 'GJ', label: 'Gujarat' },
                            { value: 'HR', label: 'Haryana' },
                            { value: 'HP', label: 'Himachal Pradesh' },
                            { value: 'JK', label: 'Jammu and Kashmir' },
                            { value: 'JH', label: 'Jharkhand' },
                        ]}
                    />
                    <InputField name="company_name" placeholder="Company Name" />
                    <InputField name="zip_code" placeholder="Zipcode *" />
                    <InputField name="primary_phone" placeholder="Primary Phone *" />
                    <InputField name="alternate_phone" placeholder="Alternate Phone" />
                    <InputField name="email" placeholder="Email Address *" type="email" />
                </form>
            </FormProvider>

            {/* button navigation */}
            <div className="w-full shrink-0 h-16 flex items-center px-4">
                <button onClick={handlePrevious} className={`bg-active_stepbar_color absolute left-2 cursor-pointer text-white px-6 py-1.5 rounded-md`}>Back</button>
                <button onClick={methods.handleSubmit(handleNext)} className={`absolute right-2 bg-active_stepbar_color cursor-pointer text-white px-6 py-1.5 rounded-md`}>Next</button>
            </div>
        </div>
    )
}

export default UserForm