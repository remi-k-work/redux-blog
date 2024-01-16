// other libraries
import { z } from "zod";

// Schema-based form validation with zod
export const validationSchema = z.object({
  postTitle: z.string().min(1, { message: "Please enter the title of this post." }),
  postAuthor: z.string().min(1, { message: "Who is the author?" }),
  postContent: z.string().min(1, { message: "Content is a required field." }),
});
