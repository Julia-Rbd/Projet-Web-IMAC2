export class Reddit {
  constructor(ready_callback) {
    this.bearer = null;
    this.refreshBearer(ready_callback);
  }

  refreshBearer(ready_callback) {
    console.log('requesting bearer');
    fetch('http://localhost:8080/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    })
    .then((resp) => resp.json())
    .then((json) => {
      this.bearer = json.access_token;
      setTimeout(this.refreshBearer.bind(this), 50 * 60 * 1000, null);
      ready_callback();
    })
    .catch(console.error);
  }

  get(path) {
    if (this.bearer == null) {
      return Promise.reject(new Error('Please, wait for the bearer token'));
    } else {
      return fetch(`http://localhost:8080/api${path}`, {
        credentials: 'include',
        headers: { Authorization: `bearer ${this.bearer}` }
      });
    }
  }
}
