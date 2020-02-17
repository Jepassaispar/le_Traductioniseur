class APIHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
    this.handler = axios.create({
      baseURL: this.BASE_URL
    });
  }

  getVerbRandomly() {
    return this.handler.get(`/randomVerb`);
  }

  getVerbSmartly(level, idsArray) {
    return this.handler.post(`/smartVerb`, { level, idsArray });
  }

  getTranslation(verb, lang) {
    return this.handler.post(`/translate`, { verb, lang });
  }
}

export default APIHandler;
