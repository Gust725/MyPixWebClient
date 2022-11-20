const Formatter = require("./formatter");
const axios = require("axios"); // Any API Client implementation. Can be axios
const Parser = require("./parser");
const https = require("https");
var format = require("xml-formatter");

const ApiClient = axios.create({
  timeout: 60000,
  httpsAgent: new https.Agent({ keepAlive: true }),
});

const someeWS = `https://localhost:44325/wsAuthor.asmx?WSDL`;
//const someeWS = `http://www.dais-w-02.somee.com/wsAuthor.asmx?WSDL`;
//SSL sign certificated
// comentar para some, sin comentar para local
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const remoteWS = {};

//#region AUTH CALLS

remoteWS.LoginIn = async (email, pass) => {
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
    let remoteWSResponse = await ApiClient.post(someeWS, args, headers);
    //console.log(format(remoteWSResponse.data))

    const parsedresponse = await Parser.convertXMLToJSON(remoteWSResponse.data);

    const data =
      parsedresponse["soap:Body"].LoginInResponse.LoginInResult[
        "diffgr:diffgram"
      ].DocumentElement.Table;
    return data;
  } catch {
    return null;
  }
};

remoteWS.ListAuthors = async () => {
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
  let remoteWSResponse = await ApiClient.post(someeWS, args, headers);

  const remoteWSResponseParsed = await Parser.convertXMLToJSON(
    remoteWSResponse.data
  );
  remoteWSResponseParsed["soap:Body"].ListAuthorsResponse.ListAuthorsResult[
    "diffgr:diffgram"
  ].DocumentElement.Table;
  return data;
};
//#endregion

//#region DASHBOARD CALLS
remoteWS.DashboardFollowsIllust = async (author_id) => {
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
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );
  const data =
    remoteIllustResponseParsed["soap:Body"].DashboardFollowsIllustResponse
      .DashboardFollowsIllustResult["diffgr:diffgram"].DocumentElement.Table;
  return data;
};

//#endregion

//#region ILLUSTPAGE CALLS
remoteWS.GetIllust = async (illust_id) => {
  let payload = {
    GetIllust: {
      illust_id: illust_id,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/GetIllust",
    },
  };

  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );
  const data =
    remoteIllustResponseParsed["soap:Body"].GetIllustResponse.GetIllustResult[
      "diffgr:diffgram"
    ].DocumentElement.Table;
  return data;
};
remoteWS.GetIllustPages = async (illust_id) => {
  let payload = {
    GetIllustPages: {
      illust_id: illust_id,
    },
  };
  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/GetIllustPages",
    },
  };

  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );
  const data =
    remoteIllustResponseParsed["soap:Body"].GetIllustPagesResponse
      .GetIllustPagesResult["diffgr:diffgram"].DocumentElement.Table;
  return data;
};
remoteWS.GetIllustsTags = async (illust_id) => {
  let payload = {
    GetIllustsTags: {
      illust_id: illust_id,
    },
  };
  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/GetIllustsTags",
    },
  };

  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );
  const data =
    remoteIllustResponseParsed["soap:Body"].GetIllustsTagsResponse
      .GetIllustsTagsResult["diffgr:diffgram"].DocumentElement.Table;
  return data;
};
//#endregion

//#region USERPROFILE CALLS
remoteWS.SingleAuthor = async (codAuthor) => {
  let payload = {
    SingleAuthor: {
      codAuthor: codAuthor,
    },
  };
  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/SingleAuthor",
    },
  };

  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );
  const data =
    remoteIllustResponseParsed["soap:Body"].SingleAuthorResponse
      .SingleAuthorResult["diffgr:diffgram"].DocumentElement.Table;
  return data;
};
//#endregion

module.exports = remoteWS;
