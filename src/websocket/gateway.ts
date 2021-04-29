import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

@WebSocketGateway({namespace:"websocketpath"})
export class Gateway implements OnGatewayConnection,OnGatewayInit,OnGatewayDisconnect{
    
    
    @WebSocketServer()
    server;

    clients=[];
    afterInit(server: any) {
      console.log("Succesfully connected Socket");
    }

    handleConnection(client) {
      console.log("handleConnection "+client);
      this.clients.push(client);

      client.once('progress-listener-ready', () => {
        console.log('progress-listener connected');        
      });
      //this.server.emit('csvcompleted',"successfully csv imported");
    }

    handleDisconnect(client: any) {
      console.log("handleDisconnect "+client);
    }

    emitfrontendData(){
      this.clients.forEach(client=>{       
        client.emit('csvcompleted',"successfully csv imported");
      })
    }
 
    
    
}