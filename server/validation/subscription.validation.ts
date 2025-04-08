import z from 'zod'
import mongoose, { Schema } from 'mongoose'


const isValidObjectId = (val:string)=> {
    return mongoose.Types.ObjectId.isValid(val);
} 

const subscriptionValidation = z.object({
    organizationId: z.custom<Schema.Types.ObjectId>(
        (val) => isValidObjectId(val) ? new mongoose.Types.ObjectId(val) : undefined,
        {
            message: "Organization id is not valid"
        }
    ),

    planName: z.string({
        required_error: "Plan name is required",
        invalid_type_error: "Plan name must be a string"
    })
        .trim()
        .min(1, "Plan name can't be empty")
        .max(255, "Plan name is too long")
        .regex(/^[a-zA-Z0-9_]+$/, "Plan name must contain only letters, numbers, and underscores")
        ,

    projectLimit: z.number({
        required_error: "Project limit is required",
        invalid_type_error: "Project limit must be a number"
    })
        .int("Project limit must be an integer")
        .min(0, "Project limit can't be negative")
        ,

    teamLimit: z.number({
        required_error: "Team limit is required",
        invalid_type_error: "Team limit must be a number"
    })
        .int("Team limit must be an integer")
        .min(0, "Team limit can't be negative")
        ,

    paymentCycle: z.enum(['monthly', 'annually'])
        .refine((val) => val === 'monthly' || val === 'annually', {
            message: "Payment cycle must be either 'monthly' or 'annually'"
        })
        .default('monthly'),

    activeFrom: z.date({
        required_error: "Active from date is required",
        invalid_type_error: "Active from date must be a valid date"
    })
        .refine((date) => date.getTime() >= Date.now(), {
            message: "Active from date cannot be in the past"
        })
        ,

    expiredAt: z.date({
        required_error: "Expired at date is required",
        invalid_type_error: "Expired at date must be a valid date"
    })
        .refine((date) => date.getTime() > Date.now(), {
            message: "Expired at date must be in the future"
        })
        ,

    isActive: z.boolean({
        required_error: "Is active status is required",
        invalid_type_error: "Is active status must be a boolean"
    })
        .default(false)
})  

export type ISubscription = z.infer<typeof subscriptionValidation>

export {
    subscriptionValidation
}