import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CrudModule } from './consumer/crud.module';
import { DashboarddataController } from './dashboarddata/dashboarddata.controller';
import { DashboarddataService } from './dashboarddata/dashboarddata.service';
import { DashboarddataModule } from './dashboarddata/dashboarddata.module';
import { ExporttocsvModule } from './exporttocsv/exporttocsv.module';
import { ExporttocsvconsumerModule } from './exporttocsvconsumer/exporttocsvconsumer.module';
import { WebsocketModule } from './websocket/websocket.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';





@Module({
  imports: [CrudModule, DashboarddataModule, ExporttocsvModule, ExporttocsvconsumerModule, WebsocketModule,
            GraphQLModule.forRoot({
                autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
                debug: true,
                playground: true
              })
            ],
  controllers: [AppController, DashboarddataController,],
  providers: [AppService, DashboarddataService],
})
export class AppModule {}
