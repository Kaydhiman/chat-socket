const path = require('path');

const debug = require('debug')('ss:lib:mail');
const moment = require('moment');
const nodemailer = require('nodemailer');
const ejs = require('ejs');

const etherealAccount = {
  user: '',
  pass: '',
};

nodemailer.createTestAccount((err, account) => {
  if (err) {
    //        debug('Create ethereal test account failed.');
    //      log.error(err);
    return;
  }
  etherealAccount.user = account.user;
  etherealAccount.pass = account.pass;
});

function createTransporter(options) {
  return new Promise((resolve, reject) => {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      // @ts-ignore
      host: process.env.MAIL_HOST || 'smtp.ethereal.email',
      port: process.env.MAIL_PORT || 587,
      secure: process.env.MAIL_SECURE || false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER || etherealAccount.user, // generated ethereal user
        pass: process.env.MAIL_PASSWORD || etherealAccount.pass, // generated ethereal password
      },
    });

    // eslint-disable-next-line no-param-reassign
    options.from = `${process.env.APP_NAME} <${process.env.MAIL_USER}>`;

    // send mail with defined transport object
    transporter.sendMail(options, (err, info) => {
      if (err) {
        // debug('Send mail failed.');
        // log.error(err);
        reject(err);
        return;
      }

      resolve(info);
      debug('Message sent: %s', info.messageId);
    });
  });
}

function send(mailOptions) {
  return createTransporter(mailOptions);
}

function render(which, viewVariables) {
  const data = viewVariables;
  // set system default properties
  data.$moment = moment;
  data.$appUrl = process.env.APP_URL;
  data.$adminAppUrl = process.env.ADMIN_APP_URL;
  data.$appName = process.env.APP_NAME;

  const [folderName, templateName] = which.split('.');

  const templateFile = `${folderName}/${templateName}-${folderName}.ejs.html`;

  const filename = path.resolve(__dirname, '../resources/mail', templateFile);

  return new Promise((resolve, reject) => {
    ejs.renderFile(filename, data, (err, html) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(html);
    });
  });
}

async function template(to, subject, which, data = {}) {
  const html = await render(which, data);
  // setup email data with unicode symbols
  const mailOptions = {
    to, // list of receivers
    subject,
    html,
  };

  await send(mailOptions);
}

async function error(err, input = {}) {
  const data = {
    $error: JSON.stringify(err, null, 2),
    $customData: input,
  };

  await template(
    process.env.ERROR_REPORTING_EMAIL.split(','),
    process.env.APP_NAME,
    'system.error',
    data,
  );
}

module.exports = {
  render,
  template,
  send,
  error,
};
