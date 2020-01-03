class ApiCalls {
  static msiProperties(url, credentials) {
    const request = new Request(`${url}`, {
      method: 'GET',
      headers: new Headers({
        'Authorization': 'Basic ' + btoa(`${credentials.login}:${credentials.password}`),
      })
    })
    return fetch(request).then(response => {
      if (response.status === 200) {
        return response.json()
      }
      return response.json().then(response => { throw (response) })
    }).catch(error => {
      throw (error)
    })
  }
}