const Formatter = require("./formatter");
const axios = require("axios"); // Any API Client implementation. Can be axios
const Parser = require("./parser");
const https = require("https");
var format = require("xml-formatter");

const ApiClient = axios.create({
  timeout: 60000,
  httpsAgent: new https.Agent({ keepAlive: true }),
});
//testing

const someeWS = `https://localhost:44325/wsAuthor.asmx?WSDL`;
// const someeWS = `http://www.dais-w-02.somee.com/wsAuthor.asmx?WSDL`;

//SSL sign certificated
// comentar para some, sin comentar para local
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const remoteWS = {};

function methodParser(method, remoteIllustResponseParsed) {
  const data =
    remoteIllustResponseParsed["soap:Body"][`${method}Response`][
      `${method}Result`
    ]["diffgr:diffgram"].DocumentElement.Table;
  return data;
}

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
  } catch (err) {
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
  // const data =
  //   remoteIllustResponseParsed["soap:Body"].DashboardFollowsIllustResponse
  //     .DashboardFollowsIllustResult["diffgr:diffgram"].DocumentElement.Table;
  const data2 = methodParser(
    "DashboardFollowsIllust",
    remoteIllustResponseParsed
  );

  return data2;
};
remoteWS.DashboardRankings = async () => {
  let payload = {
    DashboardRankings: {},
  };
  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/DashboardRankings",
    },
  };
  try {
    let args = Formatter.convertJsonToSoapRequest(payload);
    let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
    const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
      remoteIllustResponse.data
    );
    // const data =
    //   remoteIllustResponseParsed["soap:Body"].DashboardRankingsResponse
    //     .DashboardRankingsResult["diffgr:diffgram"].DocumentElement.Table;
    const data2 = methodParser("DashboardRankings", remoteIllustResponseParsed);
    return data2;
  } catch (error) {
    console.log("Error en RemoteWS: DashboardRankings ::",error.message);
    return null;
  }
};
remoteWS.DashboardRecommendedArtists = async (codUser) => {
  let payload = {
    DashboardRecommendedArtists: {
      codUser: codUser,
    },
  };
  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/DashboardRecommendedArtists",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );
  // const data =
  //   remoteIllustResponseParsed["soap:Body"].DashboardRecommendedArtistsResponse
  //     .DashboardRecommendedArtistsResult["diffgr:diffgram"].DocumentElement.Table;
  const data2 = methodParser(
    "DashboardRecommendedArtists",
    remoteIllustResponseParsed
  );

  return data2;
};
remoteWS.CommissionDashboardArtistsList = async () => {
  let payload = {
    CommissionDashboardArtistsList: {},
  };
  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/CommissionDashboardArtistsList",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );
  const data =
    remoteIllustResponseParsed["soap:Body"]
      .CommissionDashboardArtistsListResponse
      .CommissionDashboardArtistsListResult["diffgr:diffgram"].DocumentElement
      .Table;
  return data;
};
remoteWS.CommissionDashboardFollowingList = async (codUser) => {
  let payload = {
    CommissionDashboardFollowingList: {
      codUser: codUser,
    },
  };
  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/CommissionDashboardFollowingList",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );
  const data =
    remoteIllustResponseParsed["soap:Body"]
      .CommissionDashboardFollowingListResponse
      .CommissionDashboardFollowingListResult["diffgr:diffgram"].DocumentElement
      .Table;
  return data;
};
remoteWS.CommissionDashboardFollowingRecents = async (codUser) => {
  let payload = {
    CommissionDashboardFollowingRecents: {
      codUser: codUser,
    },
  };
  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/CommissionDashboardFollowingRecents",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );
  const data =
    remoteIllustResponseParsed["soap:Body"]
      .CommissionDashboardFollowingRecentsResponse
      .CommissionDashboardFollowingRecentsResult["diffgr:diffgram"]
      .DocumentElement.Table;
  return data;
};
remoteWS.CommissionDashboardIllustsList = async () => {
  let payload = {
    CommissionDashboardIllustsList: {},
  };
  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/CommissionDashboardIllustsList",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );
  const data =
    remoteIllustResponseParsed["soap:Body"]
      .CommissionDashboardIllustsListResponse
      .CommissionDashboardIllustsListResult["diffgr:diffgram"].DocumentElement
      .Table;
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

remoteWS.NewIllustPublish = async (
  id,
  title,
  sanity,
  author,
  il_type,
  is_nsfw,
  thumb_dir,
  ugoira_dir
) => {
  let payload = {
    NewIllustPublish: {
      id: id,
      title: title,
      sanity: sanity,
      author: author,
      il_type: il_type,
      is_nsfw: is_nsfw,
      thumb_dir: thumb_dir,
      ugoira_dir: ugoira_dir,
    },
  };
  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/NewIllustPublish",
    },
  };

  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );
  const data =
    remoteIllustResponseParsed["soap:Body"].NewIllustPublishResponse
      .NewIllustPublishResult["diffgr:diffgram"].DocumentElement.Table;
  return data;
};

remoteWS.AttachPageNewIllust = async (parent, page_num, large_dir) => {
  let payload = {
    AttachPageNewIllust: {
      parent: parent,
      page_num: page_num,
      large_dir: large_dir,
    },
  };
  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/AttachPageNewIllust",
    },
  };

  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );
  const data =
    remoteIllustResponseParsed["soap:Body"].AttachPageNewIllustResponse
      .AttachPageNewIllustResult["diffgr:diffgram"].DocumentElement.Table;
  return data;
};

remoteWS.AttachTagNewIllust = async (tag_name, illust_id) => {
  let payload = {
    AttachTagNewIllust: {
      parent: parent,
      page_num: page_num,
      large_dir: large_dir,
    },
  };
  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/AttachTagNewIllust",
    },
  };

  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("AttachTagNewIllust", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AttachTagNewIllustResponse.AttachTagNewIllustResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
};

//#endregion

//#region AUTHOR POSTS
remoteWS.AddNewPost = async (author_id, post_content) => {
  let payload = {
    AddNewPost: {
      author_id: author_id,
      post_content: post_content,
    },
  };
  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/AddNewPost",
    },
  };

  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("AddNewPost", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
};

//#endregion

remoteWS.AbrirRequests = async (codUser) => {
  let payload = {
    AbrirRequests: {
      codUser: codUser,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/AbrirRequests",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("AbrirRequests", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

module.exports = remoteWS;
