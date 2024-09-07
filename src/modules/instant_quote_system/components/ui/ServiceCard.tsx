type Props = {
    id: string
    service_image_url: string,
    service_title: string,
    service_type_is_home: boolean,
    isSelected: boolean,
    handleServiceSelection: (id: string) => void
}

const ServiceCard = ({ id, service_image_url, service_title, isSelected, handleServiceSelection }: Props) => {
    return (
        <div onClick={() => handleServiceSelection(id)} className="w-20 col-span-1 cursor-pointer">
            <div className={`w-24 h-24 p-1 border rounded ${isSelected ? 'bg-green-500 border-4 border-gray-500' : 'bg-transparent'}`}>
                <img className="object-cover aspect-square" src={service_image_url} alt={service_title} />
            </div>
            <p className="text-center text-sm mt-1.5 text-gray-600 text-semibold leading-tight">{service_title}</p>
        </div>
    )
}

export default ServiceCard