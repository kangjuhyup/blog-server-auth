import { Module } from '@nestjs/common';
import { AuthController } from '@auth/auth.controller';
import { AuthService } from '@auth/auth.service';
import { DatabaseModule } from '@root/database/database.module';
import { AuthJwtModule } from '@root/middleware/jwt/jwt.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
  ],
  imports : [
    DatabaseModule,
    AuthJwtModule,
    // ClientsModule.register([
    //   {
    //     name: 'auth_server',
    //     transport: Transport.KAFKA,
    //     options: {
    //       client : {
    //         clientId : 'auth',
    //         brokers : ['localhost:9002']
    //       },
    //       consumer : {
    //         groupId : 'ms_group'
    //       }
    //     },
        
    //   },
    // ]),
  ]
})
export class AuthModule {}
