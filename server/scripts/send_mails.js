const pupa = require('pupa');
const fs = require('fs');
var path = require('path');

const api_key = '49dd1c28c0cc7a779b7af9c39876f9ff-a3d67641-eb30c592';
const domain = 'mg.ovale.io';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

const emails = {
    'from':'Ovale.io <team@ovale.io>',
}

const templates = {
    'VERIFICATION_HTML': '../templates/emails/verification.tpl',
    'VERIFICATION_TXT': '../templates/emails/verification.txt' 
};


// Read template file and get back to process it 
function getTemplate(template, replacement_scheme) {
    let tpl = fs.readFileSync(path.join(__dirname, templates[template])).toString('utf-8');
    return pupa(tpl, replacement_scheme);
}





// VERIFICATION TEMPLATE
// Returns true without errors, else throw
exports.sendVerificationMail = function(email, digits) {

    var output_html, output_txt
    
    // HTML TEMPLATE
    output_html = getTemplate('VERIFICATION_HTML', { digits: digits });

    // TXT TEMPLATE
    output_txt = getTemplate('VERIFICATION_TXT', { digits: digits });

    var data = {
        from: emails.from,
        to: email,
        subject: 'Your confirmation code for OVALE.io',
        text: output_txt,
        html: output_html
    };

    // SENDS
    mailgun.messages().send(data, function (error, body) {
        if(!error) {
            console.log('mail sent')
            return true;
        } else {
            throw new Error(error.message);
        }
    });
        
};