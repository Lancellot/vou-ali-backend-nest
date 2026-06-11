import {
    Controller,
    Get,
    Request,
    UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

import { DashboardService } from '../services/dashboard.service';

@Controller('/dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {

    constructor(
        private readonly dashboardService: DashboardService,
    ) {}

    @Get()
    dashboard(@Request() req: any) {

        return this.dashboardService.dashboard(
            req.user.id,
        );
    }

    
}