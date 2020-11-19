const { _url } = require("../../../_urls");

const altSingleDeletePost = async (content) => {
  console.log(content, " content from post altSingleApproove");

  try {
    const response = await fetch(_url.alternative.single.delete, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    });

    const result = await response;
    console.log(result, " << <<< <<< Result from AltSingleDelete");
    return result;
  } catch (error) {
    console.log(error, " Error from AltSingleDelete");
  }
};

export const altSingleDelete = async (data) => {
  console.log("Response Alt Single Delete Post", data);

  const response = await altSingleDeletePost(data);
  console.log(response, " Response from altSingleDelete");
  return response;
};
