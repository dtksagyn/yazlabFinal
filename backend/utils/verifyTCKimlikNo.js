const axios = require("axios");

const verifyTCKimlikNo = async (TCKimlikNo, Ad, Soyad, DogumYili) => {
  const soapRequest = `<?xml version="1.0" encoding="utf-8"?>
<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
  <soap12:Body>
    <TCKimlikNoDogrula xmlns="http://tckimlik.nvi.gov.tr/WS">
      <TCKimlikNo>${TCKimlikNo}</TCKimlikNo>
      <Ad>${Ad.toUpperCase()}</Ad>
      <Soyad>${Soyad.toUpperCase()}</Soyad>
      <DogumYili>${DogumYili}</DogumYili>
    </TCKimlikNoDogrula>
  </soap12:Body>
</soap12:Envelope>`;

  console.log("SOAP Request:", soapRequest); // Log the SOAP request

  try {
    const response = await axios.post(
      "https://tckimlik.nvi.gov.tr/Service/KPSPublic.asmx",
      soapRequest,
      {
        headers: {
          "Content-Type": "application/soap+xml; charset=utf-8",
        },
      }
    );

    console.log("SOAP Response:", response.data); // Log the SOAP response

    // Parse the SOAP response
    const result = response.data.includes(
      "<TCKimlikNoDogrulaResult>true</TCKimlikNoDogrulaResult>"
    );
    return result; // true or false
  } catch (error) {
    console.error(
      "TC Kimlik Doğrulama Hatası:",
      error.response?.data || error.message
    );
    return false;
  }
};

module.exports = verifyTCKimlikNo;
