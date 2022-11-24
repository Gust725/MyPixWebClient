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

//const someeWS = `https://localhost:44325/wsAuthor.asmx?WSDL`;
const someeWS = `http://www.dais-w-02.somee.com/wsAuthor.asmx?WSDL`;

//SSL sign certificated
// comentar para some, sin comentar para local
//process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

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

remoteWS.AcceptedRequestsList = async (codUser) => {
  let payload = {
    AcceptedRequestsList: {
      codUser: codUser,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/AcceptedRequestsList",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("AcceptedRequestsList", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.ActualizarPerfil = async (codUser, opcion, parametro) => {
  let payload = {
    ActualizarPerfil: {
      codUser: codUser,
      opcion: opcion,
      parametro: parametro,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/ActualizarPerfil",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("ActualizarPerfil", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.AddIllustFavorites = async (illust_id, codUser) => {
  let payload = {
    AddIllustFavorites: {
      illust_id: illust_id,
      codUser: codUser,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/AddIllustFavorites",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("AddIllustFavorites", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.AddNewAlbum = async (owner_id, album_name) => {
  let payload = {
    AddNewAlbum: {
      owner_id: owner_id,
      album_name: album_name,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/AddNewAlbum",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("AddNewAlbum", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.AddNewCommentOn = async (author_id, is_response, illust_id, post_id, parent_id, emoji_id, comment_content) => {
  let payload = {
    AddNewCommentOn: {
      author_id: author_id,
      is_response: is_response,
      illust_id: illust_id,
      post_id: post_id,
      parent_id: parent_id,
      emoji_id: emoji_id,
      comment_content: comment_content,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/AddNewCommentOn",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("AddNewCommentOn", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.AddNewIllustAlbum = async (album_id, illust_id, codUser) => {
  let payload = {
    AddNewIllustAlbum: {
      album_id: album_id,
      illust_id: illust_id,
      codUser: codUser,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/AddNewIllustAlbum",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("AddNewIllustAlbum", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.Agregar = async (author_id, nickname, accountname, email, pass, birthdate, country) => {
  let payload = {
    Agregar: {
      author_id: author_id,
      nickname: nickname,
      accountname: accountname,
      email: email,
      pass: pass,
      birthdate: birthdate,
      country: country,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/Agregar",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("Agregar", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.AgregarEncrypt = async (author_id, nickname, accountname, email, pass, birthdate, country, pattern) => {
  let payload = {
    AgregarEncrypt: {
      author_id: author_id,
      nickname: nickname,
      accountname: accountname,
      email: email,
      pass: pass,
      birthdate: birthdate,
      country: country,
      pattern: pattern,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/AgregarEncrypt",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("AgregarEncrypt", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.AuthorFacturationAdd = async (author_id, fact_address, fact_postal, fact_country, balance, card_number, card_date) => {
  let payload = {
    AuthorFacturationAdd: {
      author_id: author_id,
      fact_address: fact_address,
      fact_postal: fact_postal,
      fact_country: fact_country,
      balance: balance,
      card_number: card_number,
      card_date: card_date,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/AuthorFacturationAdd",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("AuthorFacturationAdd", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.ComisionesAbiertas = async () => {
  let payload = {
    ComisionesAbiertas: {
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/ComisionesAbiertas",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("ComisionesAbiertas", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.CommissionAccept = async (comm_id, fact_id, price) => {
  let payload = {
    CommissionAccept: {
      comm_id: comm_id,
      fact_id: fact_id,
      price: price,

    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/CommissionAccept",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("CommissionAccept", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.CommissionFinish = async (comm_id, illust_id) => {
  let payload = {
    CommissionFinish: {
      comm_id: comm_id,
      illust_id: illust_id,

    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/CommissionFinish",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("CommissionFinish", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.CommissionReject = async (comm_id) => {
  let payload = {
    CommissionReject: {
      comm_id: comm_id,

    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/CommissionReject",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("CommissionReject", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.DashboardFollowingPosts = async (codUser) => {
  let payload = {
    DashboardFollowingPosts: {
      codUser: codUser,

    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/DashboardFollowingPosts",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("DashboardFollowingPosts", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.DashboardRecommendedIllusts = async (codUser) => {
  let payload = {
    DashboardRecommendedIllusts: {
      codUser: codUser,

    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/DashboardRecommendedIllusts",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("DashboardRecommendedIllusts", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.DeleteAlbum = async (album_id, owner_id) => {
  let payload = {
    DeleteAlbum: {
      album_id: album_id,
      owner_id: owner_id,

    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/DeleteAlbum",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("DeleteAlbum", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.DeleteIllust = async (illust_id, codUser) => {
  let payload = {
    DeleteIllust: {
      illust_id: illust_id,
      codUser: codUser,

    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/DeleteIllust",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("DeleteIllust", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.EditAlbum = async (album_id, owner_id, album_name) => {
  let payload = {
    EditAlbum: {
      album_id: album_id,
      owner_id: owner_id,
      album_name: album_name,

    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/EditAlbum",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("EditAlbum", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.EditAlbumPublic = async (album_id, owner_id) => {
  let payload = {
    EditAlbumPublic: {
      album_id: album_id,
      owner_id: owner_id,

    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/EditAlbumPublic",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("EditAlbumPublic", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.EditIllustPublish = async (illust_id, codUser, opcion, parametro) => {
  let payload = {
    EditIllustPublish: {
      illust_id: illust_id,
      codUser: codUser,
      opcion: opcion,
      parametro: parametro,

    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/EditIllustPublish",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("EditIllustPublish", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.EditIllustsTags = async (illust_id, codUser, operation) => {
  let payload = {
    EditIllustsTags: {
      illust_id: illust_id,
      codUser: codUser,
      operation: operation,

    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/EditIllustsTags",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("EditIllustsTags", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.EstaSiguiendo = async (codigoUsuario, IDArtista) => {
  let payload = {
    EstaSiguiendo: {
      codigoUsuario: codigoUsuario,
      IDArtista: IDArtista,

    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/EstaSiguiendo",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("EstaSiguiendo", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.FactInfo = async (codUser) => {
  let payload = {
    FactInfo: {
      codUser: codUser,

    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/FactInfo",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("FactInfo", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.FactStatus = async (codUser) => {
  let payload = {
    FactStatus: {
      codUser: codUser,

    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/FactStatus",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("FactStatus", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.FacturationBalance = async (codUser) => {
  let payload = {
    FacturationBalance: {
      codUser: codUser,

    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/FacturationBalance",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("FacturationBalance", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.FacturationCommisionOpens = async (codUser) => {
  let payload = {
    FacturationCommisionOpens: {
      codUser: codUser,

    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/FacturationCommisionOpens",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("FacturationCommisionOpens", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.FacturationInfoUpdate = async (codUser) => {
  let payload = {
    FacturationInfoUpdate: {
      codUser: codUser,

    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/FacturationInfoUpdate",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("FacturationInfoUpdate", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.FemaleDashboardRankings = async () => {
  let payload = {
    FemaleDashboardRankings: {
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/FemaleDashboardRankings",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("FemaleDashboardRankings", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.GetAlbumIllustInfo = async (codalbum) => {
  let payload = {
    GetAlbumIllustInfo: {
      codalbum: codalbum,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/GetAlbumIllustInfo",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("GetAlbumIllustInfo", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.GetAlbumInfo = async (codUser, album_id) => {
  let payload = {
    GetAlbumInfo: {
      codUser: codUser,
      album_id: album_id,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/GetAlbumInfo",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("GetAlbumInfo", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.GetAlbumList = async (codUser, album_id) => {
  let payload = {
    GetAlbumList: {
      codUser: codUser,
      album_id: album_id,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/GetAlbumList",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("GetAlbumList", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.GetCommentsFrom = async (origin_id, type_require) => {
  let payload = {
    GetCommentsFrom: {
      origin_id: origin_id,
      type_require: type_require,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/GetCommentsFrom",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("GetCommentsFrom", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.GetCommissionRequestsList = async (codUser) => {
  let payload = {
    GetCommissionRequestsList: {
      codUser: codUser,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/GetCommissionRequestsList",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("GetCommissionRequestsList", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.GetCommissionsList = async (codUser) => {
  let payload = {
    GetCommissionsList: {
      codUser: codUser,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/GetCommissionsList",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("GetCommissionsList", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.GetIllustsAuthorTags = async (codUser) => {
  let payload = {
    GetIllustsAuthorTags: {
      codUser: codUser,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/GetIllustsAuthorTags",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("GetIllustsAuthorTags", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.GetPopularTags = async () => {
  let payload = {
    GetPopularTags: {
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/GetPopularTags",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("GetPopularTags", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.GetPostList = async (codUser) => {
  let payload = {
    GetPostList: {
      codUser: codUser,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/GetPostList",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("GetPostList", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.GetPreferredTags = async (codUser) => {
  let payload = {
    GetPreferredTags: {
      codUser: codUser,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/GetPreferredTags",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("GetPreferredTags", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.GetSelfPostsList = async (codUser) => {
  let payload = {
    GetSelfPostsList: {
      codUser: codUser,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/GetSelfPostsList",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("GetSelfPostsList", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.HabilitarContenidoR34 = async (codigoUsuario) => {
  let payload = {
    HabilitarContenidoR34: {
      codigoUsuario: codigoUsuario,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/HabilitarContenidoR34",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("HabilitarContenidoR34", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.IsCommissionActive = async (author_id) => {
  let payload = {
    IsCommissionActive: {
      author_id: author_id,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/IsCommissionActive",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("IsCommissionActive", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.LoginInEncrypt = async (mail, passw, pattern) => {
  let payload = {
    LoginInEncrypt: {
      mail: mail,
      passw: passw,
      pattern: pattern,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/LoginInEncrypt",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("LoginInEncrypt", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.MaleDashboardRankings = async () => {
  let payload = {
    MaleDashboardRankings: {
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/MaleDashboardRankings",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("MaleDashboardRankings", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.RemoveIllustAlbum = async (album_id, illust_id, owner_id) => {
  let payload = {
    RemoveIllustAlbum: {
      album_id: album_id,
      illust_id: illust_id,
      owner_id: owner_id,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/RemoveIllustAlbum",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("RemoveIllustAlbum", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.RemovePost = async (post_id, author_id) => {
  let payload = {
    RemovePost: {
      post_id: post_id,
      author_id: author_id,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/RemovePost",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("RemovePost", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.RequestFinish = async (request_id, illust_id) => {
  let payload = {
    RequestFinish: {
      request_id: request_id,
      illust_id: illust_id,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/RequestFinish",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("RequestFinish", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.RequestNewCommission = async (author_id, details, deliver_date, status, commissioner_id) => {
  let payload = {
    RequestNewCommission: {
      author_id: author_id,
      details: details,
      deliver_date: deliver_date,
      status: status,
      commissioner_id: commissioner_id,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/RequestNewCommission",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("RequestNewCommission", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.RequestSolitude = async (author_id, requester_comment, requester_id) => {
  let payload = {
    RequestSolitude: {
      author_id: author_id,
      requester_comment: requester_comment,
      requester_id: requester_id,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/RequestSolitude",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("RequestSolitude", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.RequestSolitudeAccept = async (request_id) => {
  let payload = {
    RequestSolitudeAccept: {
      request_id: request_id,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/RequestSolitudeAccept",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("RequestSolitudeAccept", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.RequestSolitudeReject = async (request_id) => {
  let payload = {
    RequestSolitudeReject: {
      request_id: request_id,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/RequestSolitudeReject",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("RequestSolitudeReject", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.RequestsAbiertas = async () => {
  let payload = {
    RequestsAbiertas: {
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/RequestsAbiertas",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("RequestsAbiertas", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.RequestsList = async (codUser, rec_type) => {
  let payload = {
    RequestsList: {
      codUser: codUser,
      rec_type: rec_type,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/RequestsList",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("RequestsList", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.RequestsOpen = async (author_id) => {
  let payload = {
    RequestsOpen: {
      author_id: author_id,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/RequestsOpen",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("RequestsOpen", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.SeguirArtista = async (codigoUsuario, IDArtistaSeguir) => {
  let payload = {
    SeguirArtista: {
      codUser: codigoUsuario,
      IDArtistaSeguir: IDArtistaSeguir,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/SeguirArtista",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("SeguirArtista", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.Siguiendo = async (codigoUsuario) => {
  let payload = {
    Siguiendo: {
      codUser: codigoUsuario,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/Siguiendo",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("Siguiendo", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

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

  const data2 = methodParser("SingleAuthor", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.SumViewIllust = async (illust_id) => {
  let payload = {
    SumViewIllust: {
      illust_id: illust_id,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/SumViewIllust",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("SumViewIllust", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}

remoteWS.UserTrustLevel = async (codUser) => {
  let payload = {
    UserTrustLevel: {
      codUser: codUser,
    },
  };

  const headers = {
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
      SOAPAction: "http://tempuri.org/UserTrustLevel",
    },
  };
  let args = Formatter.convertJsonToSoapRequest(payload);
  let remoteIllustResponse = await ApiClient.post(someeWS, args, headers);
  const remoteIllustResponseParsed = await Parser.convertXMLToJSON(
    remoteIllustResponse.data
  );

  const data2 = methodParser("UserTrustLevel", remoteIllustResponseParsed);
  // const data = remoteIllustResponseParsed["soap:Body"].AddNewPostResponse.AddNewPostResult["diffgr:diffgram"].DocumentElement.Table;
  return data2;
}
module.exports = remoteWS;
