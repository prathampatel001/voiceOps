
import { saveEmailLog } from "../emailController";
import { sendEmail } from "../emailService";
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';


export const sendFormRequestEmail = async (req: Request, res: Response) => {
    try {
        // const { customer_name, customer_email } = req.body;
        const body = req.body;
        // const logFilePath = path.join(__dirname, 'request_log.json');
        const customer_name:string = "Customer"
        const customer_email:string = req.body["message"]["toolWithToolCallList"][0]["toolCall"]["function"]["arguments"]["email_address"]
        // fs.writeFileSync(logFilePath, JSON.stringify(req.body, null, 2), 'utf-8');
        // // console.log("Request body logged to file:", logFilePath); 
        // console.log("custemail",customer_email)
        

        const toolCallId = req.body["message"]["toolWithToolCallList"][0]["toolCall"]["id"]


        

        if (!customer_name || !customer_email) {
            res.status(400).json({ message: "Missing required fields." });
            return;
        }



        const templateName = "Form-Request-Mail";
        const subject = "Action Required: Please Fill Out the Form";
        const email = customer_email;
        const form_link = "https://voice-ops-eight.vercel.app/test";

        const variables = {
            template_content: {
                customer_name,
                form_link,
            },
        };

      

        Promise.allSettled([
            sendEmail(email, subject, templateName, variables),
            saveEmailLog(email, "Platform", templateName, subject, "sent", variables),
        ]).catch((error) => console.error("Error in background processing:", error));

    
        res.status(200).json(
            {
                results: [
                    {
                        "toolCallId": toolCallId,
                        "result": "Y"
                    }
                ]
            }
        );

    } catch (error) {
        console.error("Error sending form request email:", error);
    }
};




  