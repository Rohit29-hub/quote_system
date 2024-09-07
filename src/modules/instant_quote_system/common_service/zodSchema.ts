import { z } from 'zod';

// About project schema
export const aboutProjectSchema = z.object({
    hear_about_us: z.string().nonempty("Where did you hear about us?"),

    project_type: z.string().nonempty("Please select a project type"),

    company_name: z.string().optional(),

    building_size: z.string().optional(),

    selected_home: z.string().optional()
}).refine((data) => {
    if (data.project_type === 'Commercial') {
        return data.company_name?.trim() !== '' && data.building_size?.trim() !== '';
    }
    return true;
}, {
    message: "Company name and building size are required for Commercial projects",
    path: []
}).refine((data) => {
    if (data.project_type === 'Residential' && !data.selected_home) {
        return false;
    }
    return true;
}, {
    message: "Please select a home for Residential projects",
    path: ["selected_home"]
});

// User form schema or validation
export const formSchema = z.object({
    firstName: z.string().nonempty("First Name is required"),
    lastName: z.string().nonempty("Last Name is required"),
    streetAddress: z.string().nonempty("Street Address is required"),
    city: z.string().nonempty("City is required"),
    companyName: z.string().optional(),
    zipcode: z
        .string()
        .regex(/^[0-9]{6}$/, "Zipcode must be a 6-digit number")
        .nonempty("Zipcode is required"),
    primaryPhone: z
        .string()
        .regex(/^[0-9]{10}$/, "Primary Phone must be a 10-digit number")
        .nonempty("Primary Phone is required"),
    alternatePhone: z.string().optional(),
    emailAddress: z.string().email("Invalid email address").nonempty("Email Address is required"),
});



export type FormType = z.infer<typeof formSchema>
export type AboutProjectFormData = z.infer<typeof aboutProjectSchema>;
