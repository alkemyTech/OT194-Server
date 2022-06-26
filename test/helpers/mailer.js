
const { describe, it } = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const dirtyChai = require('dirty-chai');
const mailer = require('../../helpers/mailer');
const { expect } = require('chai');

chai.should();
chai.use(chaiHttp);
chai.use(dirtyChai);

module.exports = () => {
  describe('Send email', () => {
    it('It should response with a string confirming mail was sent',
      async () => {
        const response = await mailer(
          process.env.SENDGRID_TESTING_MAIL,
          'Email subject',
          'Email text',
          'Email html'
        );

        expect(response).to.deep.equal(response, 'Email sent successfully');
      });
  });

  describe('Missing params at call', () => {
    it('It should throw an error informing params to send mail are missing',
      async () => {
        try {
          await mailer();
        } catch (error) {
          expect(error).to.deep.equal(error, 'Params to send mail missing');
        }
      });
  });

  describe('Invalid email address at param "to"', () => {
    it('It should throw an error informing that email address for param "to" is invalid',
      async () => {
        try {
          await mailer(
            'invalid email address',
            'Email subject',
            'Email text',
            'Email html'
          );
        } catch (error) {
          expect(error).to.deep.equal(error, 'Invalid email address for param "to"');
        }
      });
  });

  describe('Error when sending email', () => {
    it('It should throw an error informing that email could not be sent',
      async () => {
        process.env.SENDGRID_API_KEY = 'Invalid api key';

        try {
          await mailer(
            process.env.SENDGRID_TESTING_MAIL,
            'Email subject',
            'Email text',
            'Email html'
          );
        } catch (error) {
          expect(error).to.deep.equal(error, 'There was an error sending the email');
        }
      });
  });
};
