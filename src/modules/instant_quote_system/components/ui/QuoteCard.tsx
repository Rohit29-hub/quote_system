import { Check, X } from "lucide-react";
import { Quote } from "../../types/quote";

const QuoteCard = ({ quote }:{
    quote: Quote
}) => {
    return (
        <div className="bg-white p-2 shadow-md rounded-lg flex flex-col items-center gap-y-2">
            <h3 className="text-lg font-bold text-center">{quote.quote_level}</h3>
            <button className="text-white text-center px-3 py-2 rounded-md bg-blue-400">$ {quote.price} USD</button>
            <ul className="mt-2">
                {quote.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                        {feature.available_for_this_package ? <Check size={20} color="green"/> : <X size={20} />}
                        <span className="ml-2">{feature.feature_name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuoteCard;
