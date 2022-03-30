import { Console } from 'console';
import nodemailer from 'nodemailer';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import HandlebarsMailTemplate from './HandlebarsMailTemplate';

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

interface IMailContact {
  name: string;
  email: string;
}

interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}
export default class EtherealMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();

    const mailTemplate = new HandlebarsMailTemplate();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    await transporter.sendMail(
      {
        from: {
          name: from?.name || 'Equipe API Vendas',
          address: from?.email || 'equipe@apivendas.com',
        },
        to: {
          name: to.name,
          address: to.email,
        },
        subject,
        html: await mailTemplate.parse(templateData),
      },
      (err, message) => {
        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
      },
    );
  }
}
