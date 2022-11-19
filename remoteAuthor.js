const Formatter = require("./formatter");
const axios = require("axios"); // Any API Client implementation. Can be axios
const Parser = require("./parser");
const https = require("https");
var format = require("xml-formatter");

const ApiClient = axios.create({
  timeout: 60000,
  httpsAgent: new https.Agent({ keepAlive: true }),
});

//const wsAuthor = `https://localhost:44325/wsAuthor.asmx?WSDL`;
const wsAuthor = `http://www.dais-w-02.somee.com/wsAuthor.asmx?WSDL`;
//SSL sign certificated
// comentar para some, sin comentar para local
//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const remoteAuthor = {};

//#region AUTHOR CALLS

remoteAuthor.LoginIn = async (email, pass) => {
  let payload = {
    LoginIn: {
      mail: email,
      passw: pass,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/LoginIn",
    },
  };

  try {
    let args = Formatter.convertJsonToSoapRequest(payload);
    let remoteAuthorResponse = await ApiClient.post(wsAuthor, args, headers);
    //console.log(format(remoteAuthorResponse.data))

    const parsedresponse = await Parser.convertXMLToJSON(
      remoteAuthorResponse.data
    );

    const data =
      parsedresponse["soap:Body"].LoginInResponse.LoginInResult[
        "diffgr:diffgram"
      ].DocumentElement.Table;
    return data;
  } catch {
    return null;
  }
};

remoteAuthor.ListAuthors = async () => {
  // try {
  let payload = {
    ListAuthors: {},
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/ListAuthors",
    },
  };

  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteAuthorResponse = await ApiClient.post(wsAuthor, args, headers);

  const remoteAuthorResponseParsed = await Parser.convertXMLToJSON(
    remoteAuthorResponse.data
  );
  remoteAuthorResponseParsed["soap:Body"].ListAuthorsResponse.ListAuthorsResult[
    "diffgr:diffgram"
  ].DocumentElement.Table;
  return data;
};
//#endregion

remoteAuthor.DashboardFollowsIllust = async (author_id) => {
  let payload = {
    DashboardFollowsIllust: {
      codUser: author_id,
    },
  };
  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/DashboardFollowsIllust",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(wsAuthor, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );
  const data =
    remoteIllustResponseParsed["soap:Body"].DashboardFollowsIllustResponse
      .DashboardFollowsIllustResult["diffgr:diffgram"].DocumentElement.Table;
  return data;
};

module.exports = remoteAuthor;
