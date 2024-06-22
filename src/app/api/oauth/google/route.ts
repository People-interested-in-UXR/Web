export async function GET(request: Request) {
  // const data = await fetch(authUrl);
  // console.log(data);

  // let queryString = "";
  // params.forEach((value, key) => {
  //   queryString += `${key}=${value}&`;
  // });

  // console.log(queryString);

  // const authData = await fetch(
  //   `https://accounts.google.com/o/oauth2/auth?${queryString}`
  // );
  // console.log(authData.body);

  // const json = await authData.json();
  // console.log(json);

  return Response.json({ message: "Hello World" });
}

export async function POST(request: Request) {
  // const data = await fetch(authUrl);
  // console.log(data);

  // let queryString = "";
  // params.forEach((value, key) => {
  //   queryString += `${key}=${value}&`;
  // });

  // console.log(queryString);

  // const authData = await fetch(
  //   `https://accounts.google.com/o/oauth2/auth?${queryString}`
  // );
  // console.log(authData.body);

  // const json = await authData.json();
  // console.log(json);

  return Response.json({ message: "Hello World" });
}
