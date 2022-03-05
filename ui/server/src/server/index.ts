import express from "express";
import fetch, {RequestInit} from "node-fetch";
import * as qs from 'qs';
import pkg from 'log4js';
import bodyParser from "body-parser";
import { BASE_URL, PORTAL_SERVICE_NAME, SERVER_PORT } from "../config.js";
const { getLogger } = pkg;
const log = getLogger('startup');

interface Config extends RequestInit {

}
export const start = () => {
    
    const app = express();
    app.use(bodyParser.json())
    app.use(express.static('../dist'));
    app.use(`/${PORTAL_SERVICE_NAME}`, (req, res, next) => {
      log.info(req.query, req.url, req.baseUrl)
      handle(req, res, next);
    });
    
    const handle = async (request, response, next) => {
      const customerConfig: Config = {
        method: request.method,
        body: JSON.stringify(request.body),
        headers: request.headers
      }
      try {
     
        const url = `${BASE_URL}${request?.url}?${qs.stringify(request.query)}`;
        log.info("start request to %s", url);
        // log.info(request)
        const res = await fetch(url, {...customerConfig});
        const data = await res.json();
        response.send(data);
      } catch (e) {
        log.error(e);
      }
      next();
    }
    app.listen(SERVER_PORT, () => {
      log.info(`server is running on http://localhost:${SERVER_PORT}`);
    });
}

