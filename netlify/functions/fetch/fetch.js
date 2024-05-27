const axios = require("axios");

exports.handler = async function (event, context) {
  try {
    const { name, email, gdpr, hp, list, subform } = JSON.parse(event.body);

    const data = {
      personalizations: [
        {
          to: [{ email: email }],
          subject: "New RSVP Submission",
        },
      ],
      from: { email: "team@purplebubble.org" },
      content: [
        {
          type: "text/plain",
          value: `Name: ${name}\nEmail: ${email}\nGDPR: ${gdpr}\nHP: ${hp}\nList: ${list}\nSubform: ${subform}`,
        },
      ],
    };

    const response = await axios.post(
      "https://api.mailchannels.net/tx/v1/send",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);

    return {
      statusCode: response.status,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.log(error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
