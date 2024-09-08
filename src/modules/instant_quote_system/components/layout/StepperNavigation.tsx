import { useSelector } from "react-redux"
import { RootState } from "../../../../redux/store"

const StepperNavigation = () => {
    const {step_count} = useSelector((state: RootState) => state.instant_quote.user_and_answers);
    return (
        <div className="w-full h-12 flex items-center gap-x-1">
            <div className={`flex-1 rounded-md h-full relative ${step_count !== 2 && step_count !== 4 && step_count !== 5 ? 'bg-active_stepbar_color text-white' : 'bg-[#efefef] text-gray-600'}`}>
                <div className="flex-1 flex h-full items-center gap-x-3 pl-3">
                    <span className="sm:text-sm text-xs  font-bold">1</span>
                    <h1 className="sm:text-sm text-xs  capitalize font-bold">General Information</h1>
                </div>
            </div>
            <div className={`flex-1 rounded-md h-full relative ${step_count === 2 ? 'bg-active_stepbar_color text-white' : 'bg-[#efefef] text-gray-600'}`}>
                <div className="flex-1 flex h-full items-center gap-x-3 pl-3">
                    <span className="sm:text-sm text-xs  font-bold">2</span>
                    <h1 className="sm:text-sm text-xs  capitalize font-bold">Service Details</h1>
                </div>
            </div>
            <div className={`flex-1 rounded-md h-full relative ${step_count === 4 || step_count === 5 ? 'bg-active_stepbar_color text-white' : 'bg-[#efefef] text-gray-600'}`}>
                <div className="flex-1 flex h-full items-center gap-x-3 pl-3">
                    <span className="sm:text-sm text-xs  font-bold">3</span>
                    <h1 className="sm:text-sm text-xs  capitalize font-bold">Get Quote</h1>
                </div>
            </div>
        </div>
    )
}

export default StepperNavigation