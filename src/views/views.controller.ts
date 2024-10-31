import { Controller, Get, Render } from '@nestjs/common';

const absolutePath = (path: string) => '../' + path;

@Controller('views')
export class ViewsController {
  @Get()
  @Render('templates/layout')
  async home() {
    console.log('🛠️🛠️🛠️🛠️🛠️');
    return {
      title: 'test',
      template: absolutePath('pages/index'),
      name: 'devkimson',
      scriptVersion: '1',
    };
  }

  @Get('about')
  @Render('templates/layout')
  async about() {
    console.log('🛠️🛠️🛠️🛠️🛠️', 'req.url');
    return {
      title: 'test',
      template: absolutePath('pages/about'),
      name: 'devkimson',
      scriptVersion: '1',
    };
  }
}
