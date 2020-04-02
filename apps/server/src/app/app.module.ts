import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from '../config/configuration';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `./environments/.${process.env['NODE' + '_ENV']}.env`,
    load: [configuration]
  }),
    TypeOrmModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
