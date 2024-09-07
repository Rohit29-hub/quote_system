
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AboutProjectFormData, aboutProjectSchema } from '../../../common_service/zodSchema';
import { Check } from 'lucide-react';
import TopHeading from '../../ui/TopHeading';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../redux/store';
import { decrementStep, incrementStep, updateAboutProjectData } from '../../../redux/reducers/userAnswerSlice';

const AboutProject = () => {
    // aboutProjectData state from redux user_and_answers slice for [manageState when we going next or previous]
    const { aboutProjectData} = useSelector((state: RootState) => state.instant_quote.user_and_answers);
    // check the total_question_length of the service
    const { total_question_length } = useSelector((state: RootState) => state.instant_quote.questions);
    
    // dispatch method for dispatching slices actions
    const dispatch = useDispatch<AppDispatch>();

    // I am using react-hook-from for manage form data efficienty and prevent states
    const { control, handleSubmit, setValue, watch, clearErrors, formState: { errors } } = useForm<AboutProjectFormData>({
        resolver: zodResolver(aboutProjectSchema),
        defaultValues: {
            hear_about_us: '',
            project_type: 'Residential',
            company_name: '',
            building_size: '',
            selected_home: ''
        }
    });

    // Method or function for go to next component
    const handleNext = (data: AboutProjectFormData) => {
        dispatch(updateAboutProjectData(data)); // Add the user selected Project info into question_answer slice
        if(total_question_length === 0){
            dispatch(incrementStep(3)); // if the questions not available for service so skip the question component
        }else{
            dispatch(incrementStep()); // increase step by one
        }
    };

    // Method or function for go to next component
    const handlePrevious = () => {
        dispatch(decrementStep()); // simple decrement the step for go to previous componenet
    }

    // using projectType and selectedHome value for component
    const watchProjectType = watch('project_type');
    const watchSelectedHome = watch('selected_home');

    // If form validation error occur
    const firstError = Object.values(errors).find(error => error) as { message: string } | undefined;
    // error_message of first error
    const errorMessage = firstError?.message;

    // Set the value in fields if its persent in redux 
    useEffect(() => {
        // aboutProjectData come from redux store
        if (aboutProjectData) {
            setValue('hear_about_us', aboutProjectData.hear_about_us);
            setValue('project_type', aboutProjectData.project_type);
            setValue('company_name', aboutProjectData.company_name);
            setValue('building_size', aboutProjectData.building_size);
            setValue('selected_home', aboutProjectData.selected_home);
        }
    }, [])

    return (
        <>
            <div className="w-full h-full flex py-6 px-2 flex-col items-center sm:justify-center gap-y-4 relative overflow-auto">
                {/* heading component that show the current tab or section */}
                <TopHeading title='General Information' />

                {/* if error occur */}
                {errorMessage && (
                    <div className="w-full  py-2 pl-1 bg-red-200 text-red-800 rounded">
                        <p>{errorMessage}</p>
                    </div>
                )}

                {/* Hear about us select field */}
                <div className="w-full h-auto">
                    <p className="text-base py-2">Where did you hear about us?</p>
                    <Controller
                        name="hear_about_us"
                        control={control}
                        render={({ field }) => (
                            <select {...field} className="w-full border text-base pl-2 py-1 outline-none rounded-sm focus:shadow focus:shadow-blue-400">
                                <option value="">Please select *</option>
                                <option value="facebook">Facebook</option>
                                <option value="google">Google</option>
                                <option value="googleads">Google Ad</option>
                                <option value="customer">Customer</option>
                                <option value="referral">Referral</option>
                            </select>
                        )}
                    />
                </div>

                {/* Project Type two buttons [residentail,commercial]*/}
                <div className="w-auto h-auto">
                    <h2>What type of project is this?</h2>
                    <div className="mt-2">
                        <button
                            type="button"
                            onClick={() => setValue('project_type', 'Residential')}
                            className={`border rounded-tl rounded-bl z-10 text-center py-1 px-3 ${watchProjectType === 'Residential' ? 'bg-active_stepbar_color border-active_stepbar_color text-white' : 'border-r-transparent hover:bg-gray-100 text-black'}`}
                        >
                            Residential
                        </button>
                        <button
                            type="button"
                            onClick={() => setValue('project_type', 'Commercial')}
                            className={`text-center py-1 px-3 border rounded-tr rounded-br ${watchProjectType === 'Commercial' ? 'bg-active_stepbar_color border-active_stepbar_color text-white' : 'border-l-transparent hover:bg-gray-100 text-black'}`}
                        >
                            Commercial
                        </button>
                    </div>
                </div>

                {/* Conditional Rendering based on Project Type */}
                {watchProjectType === 'Residential' ? (
                    <div className="w-full h-auto grid sm:grid-cols-4 grid-cols-3 md:grid-cols-5 sm:grid-rows-1 gap-1 mt-4">
                        {/* showing 5 home's sizes we can seprate this component also */}
                        {home_data.map((info) => (
                            <div
                                key={info.id}
                                onClick={() => {
                                    clearErrors('selected_home');
                                    setValue('selected_home', info.title)
                                }}
                                className={`w-full h-48 flex cursor-pointer flex-col items-center justify-between px-2 py-3 ${watchSelectedHome === info.title ? 'bg-active_stepbar_color text-white' : 'bg-home_bg'} col-span-1 rounded shadow-inner`}
                            >
                                <p className='text-sm'>{info.title}</p>
                                <img src={info.image} alt={info.title} />
                                {watchSelectedHome === info.title ? (
                                    <Check strokeWidth={4} size={24} color="green" />
                                ) : (
                                    <button className="bg-slate-100 px-2 py-1 rounded">Select</button>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    // If project type is commercial so ask them about [company_name,building_size]
                    <div className="w-full h-full flex flex-col gap-x-5 mt-5 justify-around">
                        <Controller
                            name="company_name"
                            control={control}
                            render={({ field }) => (
                                <input {...field} className="border placeholder-gray-400 rounded outline-none pl-2 py-1.5 focus:shadow focus:shadow-blue-400" type="text" placeholder="Company Name" />
                            )}
                        />
                        <Controller
                            name="building_size"
                            control={control}
                            render={({ field }) => (
                                <select {...field} className="border rounded outline-none pl-2 py-1.5 focus:shadow focus:shadow-blue-400">
                                    <option value="">Commercial Building Size</option>
                                    <option value="less_than_2000">Less than 2000 sq ft</option>
                                    <option value="2001_to_5000">2001 to 5000 sq ft</option>
                                    <option value="5001_to_10000">5001 to 10000 sq ft</option>
                                    <option value="10001_to_20000">10001 to 20000 sq ft</option>
                                    <option value="20001_to_40000">20001 to 40000 sq ft</option>
                                    <option value="40001_to_75000">40001 to 75000 sq ft</option>
                                    <option value="750001_and_up">750001 sq ft And Up</option>
                                </select>
                            )}
                        />
                    </div>
                )}

                {/* navigation button for going previous and next */}
                <div className="w-full border shrink-0 relative h-16 mb-4 bg-[#f5f5f5] flex items-center px-4">
                    <button onClick={handlePrevious} className={`bg-active_stepbar_color absolute left-2 cursor-pointer text-white px-6 py-1.5 rounded-md`}>Back</button>
                    <button onClick={handleSubmit(handleNext)} className={`absolute right-2 bg-active_stepbar_color cursor-pointer text-white px-6 py-1.5 rounded-md`}>Next</button>
                </div>
            </div>
        </>
    );
};

export default AboutProject;


/**
 * static data for home, because we have added all the home size or type.
 * so, we don't need to add more home size in feature. that's why i am using this statically.
 */
const home_data = [
    {
        id: 1,
        title: 'Small Home',
        size: 'Usually 2,000 SqFt or less',
        image: 'https://bids.responsibid.com/img/HS1.png'
    },
    {
        id: 2,
        title: 'Medium Home',
        size: 'Usually between 2,000 or 3,000 SqFt',
        image: 'https://bids.responsibid.com/img/HS2.png'
    },
    {
        id: 3,
        title: 'Large Home',
        size: 'Usually between 3,000 or 4,000 SqFt',
        image: 'https://bids.responsibid.com/img/HS3.png'
    },
    {
        id: 4,
        title: 'XL Home',
        size: 'Usually between 4,000 or 5,000 SqFt',
        image: 'https://bids.responsibid.com/img/HS4.png'
    },
    {
        id: 5,
        title: 'XXL Home',
        size: 'Usually 5,000 SqFt or more',
        image: 'https://bids.responsibid.com/img/HS5.png'
    }
]