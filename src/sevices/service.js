class Service {
  constructor(method, data, token) {
    this.method = method.toUpperCase();
    this.data = data;
    this.token = token;
    this._options = {
      method: this.method,
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `bearer ${this.token}`
      },
      body: (this.data ? JSON.stringify(this.data) : null),  
    }
  }
  
  async makeRequest(url) {
    try {
      const response = await fetch(url, this._options);
      return response
    } catch(exception) {
      return exception;
    }
  }
}

const getRequest = async (url, token) => {
  const service = new Service('GET', null, token);
  const response = await service.makeRequest(url);
  return response;
}

const dataChangeRequest = async (url, data, token, method) => {
  const service = new Service(method, data, token);
  const response = await service.makeRequest(url);
  return response;
} 

export { getRequest, dataChangeRequest };
