import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';


@Controller()
export class AppController {
    
    @ApiExcludeEndpoint()
    @Get()
    async redirect(@Res() resposta: any) {
        return resposta.redirect('/swagger');
    }

}