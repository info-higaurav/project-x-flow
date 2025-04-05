import z from 'zod'
import mongoose from 'mongoose'

const isValidId = (val:string)=>{
    return mongoose.Types.ObjectId.isValid(val);
} 

const roles = ["pending","inprogress","completed"] as const;

const taskValSchema = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title must be a string",
    })
        .min(1, "Title can't be empty")
        .max(255, "Title is too large"),

    description: z.string({
        required_error: "Description is required",
        invalid_type_error: "Description must be a string",
    })
        .min(1, "Description can't be empty")
        .max(255, "Description is too large"),

    status: z.enum(roles)
        .default("pending"),

    assignedBy: z.custom<mongoose.Types.ObjectId>(
        (val) => isValidId(val) && new mongoose.Types.ObjectId(val),
        {
            message: "Assignor id is not valid",
        }
    ),

    assignedTo: z.custom<mongoose.Types.ObjectId>(
        (val) => isValidId(val) && new mongoose.Types.ObjectId(val),
        {
            message: "Assigned id is not valid",
        }
    ),

    projectId: z.custom<mongoose.Types.ObjectId>(
        (val) => isValidId(val) && new mongoose.Types.ObjectId(val),
        {
            message: "Project id is not valid",
        }
    ),

  createdAt: z.coerce.date()  // Convert string to Date
    .refine((date) => date.getTime() >= Date.now(), {
      message: "Created at date cannot be in the past"
    }),

  dueDate: z.coerce.date()  // Convert string to Date
    .refine((date) => date.getTime() >= Date.now(), {
      message: "Due date cannot be in the past"
    }),

  completedAt: z.coerce.date()  // Convert string to Date
    .refine((date) => date.getTime() >= Date.now(), {
      message: "Completion date cannot be in the past"
    })
    .nullable()
    .optional(),

})

export type ITask = z.infer<typeof taskValSchema>

export {
    taskValSchema
}
