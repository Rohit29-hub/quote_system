import { FormProvider, useForm } from "react-hook-form";
import InputField from "../../ui/InputField";
import { userType } from "../../../types/usertype";
import TopHeading from "../../ui/TopHeading";
import { addUsersInfo, decrementStep, incrementStep } from "../../../redux/reducers/userAnswerSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../../../common_service/zodSchema";

const UserForm = () => {

    const disptach = useDispatch<AppDispatch>();

    const methods = useForm<userType>({
        resolver: zodResolver(formSchema),
    });

    const handlePrevious = () => {
        disptach(decrementStep());
    }

    const handleNext = (data: userType) => {
        disptach(addUsersInfo(data));
        disptach(incrementStep());
    }

    return (
        <div className="w-full h-full flex relative flex-col items-center justify-start">
            <TopHeading title={"General Information"} />

            {/* form components */}
            <FormProvider {...methods}>
                <form className='w-full h-auto grid grid-cols-2 gap-4 p-4'>
                    <InputField name="firstName" placeholder="First Name *" />
                    <InputField name="lastName" placeholder="Last Name *" />
                    <InputField name="streetAddress" placeholder="Street Address *" />
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
                    <InputField name="companyName" placeholder="Company Name" />
                    <InputField name="zipcode" placeholder="Zipcode *" />
                    <InputField name="primaryPhone" placeholder="Primary Phone *" />
                    <InputField name="alternatePhone" placeholder="Alternate Phone" />
                    <InputField name="emailAddress" placeholder="Email Address *" type="email" />
                </form>
            </FormProvider>

            {/* button navigation */}
            <div className="w-full shrink-0 absolute bottom-10 h-16 bg-[#f5f5f5] flex items-center px-4">
                <button onClick={handlePrevious} className={`bg-active_stepbar_color absolute left-2 cursor-pointer text-white px-6 py-1.5 rounded-md`}>Back</button>
                <button onClick={methods.handleSubmit(handleNext)} className={`absolute right-2 bg-active_stepbar_color cursor-pointer text-white px-6 py-1.5 rounded-md`}>Next</button>
            </div>
        </div>
    )
}

export default UserForm