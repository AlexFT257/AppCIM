const GetData = async (collectionReq, id, getOne) => {
  //Position, Stadistics, Status
  try {
    const queryOneData = {
      collection: collectionReq,
      database: "CIMUbb",
      dataSource: "DevData",
      projection: {},
      filter: { id },
      sort: {
        date: -1,
      },
      limit: 1
    };

    const queryData = {
      collection: collectionReq,
      database: "CIMUbb",
      dataSource: "DevData",
      projection: {},
      filter: { id }
    };

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
      "api-key":
        "hDYzA5V8btEmWF0tH1Pe1E6MVolfd5QSzaVCmJjOaOxcGl9WUNdrW0bB54mHn3m8",
    };

    const fetchOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify((getOne ? queryOneData : queryData)),
    };

    const url =
      "https://sa-east-1.aws.data.mongodb-api.com/app/data-zdsep/endpoint/data/v1/action/find";

    return fetch(url, fetchOptions)
      .then((response) => {
        // console.log("response",response);
        return response.json();
      })
      .then((data) => {
        const { documents } = data;
       /*  console.log(data); */
        /* console.log("data", documents[0]); */
        // console.log("Documents",documents)
        return documents;
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        return;
      });
  } catch (error) {
    console.error(error);
    return "Error";
  }
};

export default GetData;
