const userAuth = async (baseUrl, credentials) => {
  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials),
  }
  try {
    const response = await fetch(baseUrl, options);
    return response;
  } catch(exception) {
    return exception;
  }
}

export default userAuth; 