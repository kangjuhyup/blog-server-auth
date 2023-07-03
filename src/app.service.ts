import { Injectable } from '@nestjs/common';
import { KafkaService } from './middleware/kafka/kafka.service';

@Injectable()
export class AppService {

  constructor(private readonly kafkaService: KafkaService) {}

  async sendMessage() {
    return this.kafkaService.sendMessage('test-topic', 'Hello World!');
  }

  getHello(): string {
    return 'Hello World!';
  }
}
