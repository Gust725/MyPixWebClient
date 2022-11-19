const Formatter = require("./formatter");
const axios = require("axios"); // Any API Client implementation. Can be axios
const Parser = require("./parser");
const https = require("https");
// const { headers } = require("./headers");  //non-functional
var format = require("xml-formatter");

const ApiClient = axios.create({
  timeout: 60000,
  httpsAgent: new https.Agent({ keepAlive: true }),
});

//const wsAuthor = `https://localhost:44325/wsAuthor.asmx?WSDL`;
//const wsIllust = 'https://localhost:44325/wsIllust.asmx?WSDL';
const wsAuthor = `http://www.dais-w-02.somee.com/wsAuthor.asmx?WSDL`;
const wsIllust = "https://www.dais-w-02.somee.com/wsIllust.asmx?WSDL";
//SSL sign certificated
// comentar para some, sin comentar para local
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const remote = {};

//#region AUTHOR CALLS

remote.LoginIn = async (email, pass) => {
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
    let remoteResponse = await ApiClient.post(wsAuthor, args, headers);
    //console.log(format(remoteResponse.data))

    const parsedresponse = await Parser.convertXMLToJSON(remoteResponse.data);

    const data =
      parsedresponse["soap:Body"].LoginInResponse.LoginInResult[
        "diffgr:diffgram"
      ].DocumentElement.Table;
    return data;
  } catch {
    return null;
  }
};

remote.ListAuthors = async () => {
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
  let remoteResponse = await ApiClient.post(wsAuthor, args, headers);

  // return remoteResponse

  const remoteResponseParsed = await Parser.convertXMLToJSON(
    remoteResponse.data
  );
  // console.log(remoteResponseParsed["soap:Body"].ListAuthorsResponse.ListAuthorsResult["diffgr:diffgram"].DocumentElement.Table);
  // const data = remoteResp  onseParsed["soap:Body"].ListAuthorsResponse.ListAuthorsResult["diffgr:diffgram"].DocumentElement.Table;
  const data =
    remoteResponseParsed["soap:Body"].ListAuthorsResponse.ListAuthorsResult[
      "diffgr:diffgram"
    ].DocumentElement.Table;
  // console.log(typeof data)
  // return remoteResponseParsed;
  return data;
  // } catch (err) {
  //   throw new Error(`Oops something went wrong. Please try again later ${err}`);
  // }
};
//#endregion
//#region ILLUST CALLS
remote.DashboardFollowsIllust = async (author_id) => {
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
  let remoteResponse = await ApiClient.post(wsIllust, args, headers);
  const remoteResponseParsed = await Parser.convertXMLToJSON(
    remoteResponse.data
  );
  const data =
    remoteResponseParsed["soap:Body"].DashboardFollowsIllustResponse
      .DashboardFollowsIllustResult["diffgr:diffgram"].DocumentElement.Table;
  return data;
};
//#endregion
module.exports = remote;
