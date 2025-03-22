
import { saveEmailLog } from "../emailController";
import { sendEmail } from "../emailService";
import { Request, Response } from 'express';


export const sendFormRequestEmail = async (req: Request, res: Response) => {
    try {
        const { customer_name, customer_email } = req.body;

        if (!customer_name || !customer_email) {
            res.status(400).json({ message: "Missing required fields." });
            return;
        }

        const templateName = "Form-Request-Mail";
        const subject = "Action Required: Please Fill Out the Form";
        const email = customer_email;
        const form_link = "http://localhost:3021/test";

        const variables = {
            template_content: {
                customer_name,
                form_link,
            },
        };

        res.status(200).json({
            message: "Form request email is being processed",
            status: true,
        });

        Promise.allSettled([
            sendEmail(email, subject, templateName, variables),
            saveEmailLog(email, "Platform", templateName, subject, "sent", variables),
        ]).catch((error) => console.error("Error in background processing:", error));

    } catch (error) {
        console.error("Error sending form request email:", error);
    }
};




  