import express from "express";
import fetch, {RequestInit} from "node-fetch";
import * as qs from 'qs';
import pkg from 'log4js';
const { getLogger } = pkg;
const log = getLogger('startup');

interface Config extends RequestInit {

}
export const start = () => {
    
    const app = express();
    app.use(express.static('../dist'));
    app.use("/cms-portal", (req, res, next) => {
      handle(req, res, next);
    });
    
    const handle = async (request, response, next) => {
      const customerConfig: Config = {
        method: request.method,
        body: JSON.stringify(request.body),
        headers: request.headers
      }
      try {
        log.info("start to request ", `http://cms-portal?${qs.stringify(request.query)}`)
        const res = await fetch(`http://cms-portal?${qs.stringify(request.query)}`, {...customerConfig});
        const data = await res.json();
        response.send(data);
      } catch (e) {
        log.error(e);
      }
      next();
    }
    app.listen(3002, () => {
      log.info("server is running on http://localhost:3002");
    });
}

