const Formatter = require("./formatter");
const axios = require("axios"); // Any API Client implementation. Can be axios
const Parser = require("./parser");
const https = require("https");
var format = require("xml-formatter");

const ApiClient = axios.create({
  timeout: 2000,
  httpsAgent: new https.Agent({ keepAlive: true }),
});

//const wsAuthor = `https://localhost:44325/wsAuthor.asmx?WSDL`;
//const wsIllust = 'https://localhost:44325/wsIllust.asmx?WSDL';
const wsIllust = "https://www.dais-w-02.somee.com/wsAuthor.asmx?WSDL";
//SSL sign certificated
// comentar para some, sin comentar para local
//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const remoteIllust = {};

//#region ILLUST CALLS
remoteIllust.DashboardFollowsIllust = async (author_id) => {
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
  let remoteIllustResponse = await ApiClient.post(wsIllust, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );
  const data =
    remoteIllustResponseParsed["soap:Body"].DashboardFollowsIllustResponse
      .DashboardFollowsIllustResult["diffgr:diffgram"].DocumentElement.Table;
  return data;
};
//#endregion
module.exports = remoteIllust;
