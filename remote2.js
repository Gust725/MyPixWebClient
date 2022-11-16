const Formatter = require("./formatter");
const ApiClient = require("axios"); // Any API Client implementation. Can be axios
const Parser = require("./parser");
var format = require("xml-formatter");

const url = `https://localhost:44325/wsAuthor.asmx?WSDL`;
// const url = `http://www.dais-w-02.somee.com/wsAuthor.asmx?WSDL`;

//SSL sign certificated
// comentar para some, sin comentar para local
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const remote = {};

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

  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteResponse = await ApiClient.post(url, args, headers);
  //console.log(format(remoteResponse.data))

  const parsedresponse = await Parser.convertXMLToJSON(remoteResponse.data);

  const data = parsedresponse["soap:Body"].LoginInResponse.LoginInResult[
    "diffgr:diffgram"
  ].DocumentElement.Table;
  return data;
};

remote.ListAuthors = async () => {
  try {
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
    let remoteResponse = await ApiClient.post(url, args, headers);

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
  } catch (err) {
    throw new Error(`Oops something went wrong. Please try again later ${err}`);
  }
};

module.exports = remote;
