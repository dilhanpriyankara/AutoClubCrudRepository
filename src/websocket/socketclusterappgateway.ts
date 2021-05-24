import { WebSocketGateway } from "@nestjs/websockets";
import * as socketClusterServer from 'socketcluster-server';
const http = require("http");
@WebSocketGateway()
export class Socketclusterappgateway{
    httpServer: any;
    agServer: any;

    constructor(){
        this.httpServer=http.createServer();
        this.agServer = socketClusterServer.attach(this.httpServer, {});
        this.httpServer.listen(8000);
        console.log('inside the handle connection');

    }

    
    
    async connectionComplete() {
             
      console.log("call connection complete");
     // this.agServer.exchange.transmitPublish('csvcompletedChanel','Successfully CSV Exported',);
      for await (const { socket } of this.agServer.listener('connection')) {
            console.log('Socket is ready');
            for await (const data of socket.receiver('channelName')) {
               console.log(data);               
               this.agServer.exchange.transmitPublish(
                data,
                'Successfully CSV Exported',
                );
            }
        }
       
    }
}