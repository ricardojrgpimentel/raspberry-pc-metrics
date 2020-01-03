class ApiCalls {
  static msiProperties() {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    return fetch("http://localhost:8080/", requestOptions)
      .then(response => response.text())
      .then(result => result)
      .catch(error => error);
  }
}

export default ApiCalls