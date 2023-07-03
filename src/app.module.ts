import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './middleware/kafka/kafka.module';

@Module({
  imports: [
    KafkaModule.register({
      clientId: `test-id`,
      brokers: ['localhost:9092'],
      groupId: 'consumer-group-id',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
