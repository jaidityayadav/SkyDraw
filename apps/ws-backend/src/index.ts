import path from "path";
import { WebSocketServer } from 'ws';
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtsecret } from '@repo/backend-common';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws, Request) {
  const url = Request.url;
  if (!url) {
    return;
  }

  const queryParams = new URLSearchParams(url.split('?')[1]);

  const token = queryParams.get('token') || "";
  const decoded = jwt.verify(token, jwtsecret)

  if (!decoded || !(decoded as JwtPayload).userId) {
    ws.close();
    return;
  }

  ws.on('message', function message(data) {
    ws.send('pong');
  });

});