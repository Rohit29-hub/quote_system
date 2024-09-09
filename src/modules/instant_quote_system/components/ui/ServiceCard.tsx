import { ServiceCardProps } from "../../types/service"

const ServiceCard = ({ id, service_image_url, service_title, isSelected, handleServiceSelection }: ServiceCardProps) => {
    return (
        <div onClick={() => handleServiceSelection(id)} className="w-auto flex flex-col items-center col-span-1 cursor-pointer">
            <div className={`w-24 h-24 p-1 border rounded ${isSelected ? 'bg-green-500 border-4 border-gray-500' : 'bg-transparent'}`}>
                <img className="object-cover aspect-square" src={service_image_url} alt={service_title} />
            </div>
            <p className="text-center text-sm mt-1.5 text-gray-600 text-semibold leading-tight">{service_title}</p>
        </div>
    )
}

export default ServiceCard