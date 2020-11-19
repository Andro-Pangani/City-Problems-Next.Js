const { _url } = require("../../../_urls");

const altSingleApproovePost = async (content) => {
  console.log(content, " content from post altSingleApproove");

  try {
    const response = await fetch(_url.alternative.single.approove, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });

    const result = await response;
    console.log(result, " << <<< <<< Result from AltSingleApproove");
    return result;
  } catch (error) {
    console.log(error, " Error from AltSingleApproove");
  }
};

export const altSingleApproove = async (data) => {
  console.log("Response Alt Single Approove Post", data);

  const response = await altSingleApproovePost(data);
  console.log(response, " Response from altSingleApproove");
  return response;
};
