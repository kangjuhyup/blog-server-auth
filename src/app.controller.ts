import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('send-message')
  sendMessage() {
    return this.appService.sendMessage();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
