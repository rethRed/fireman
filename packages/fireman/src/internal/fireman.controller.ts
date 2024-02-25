import { Body, Controller, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { AppGuard, AppGuardOptions } from "@common/guards";
import { FiremanService } from "./fireman.service";

@Controller("fireman")
export class FiremanController {

    constructor(
        private readonly firemanService: FiremanService
    ){}

    @AppGuardOptions()
    @UseGuards(...AppGuard({
        isAdminGuard: true
    }))
   @Post("become-fireman")
    async becomeFireman(
         @Req() req: Request,
         @Body() body: { fullname: string }
    ) {
         return await this.firemanService.becomeFireman(req.currentUser.id, body.fullname).then(res => {
              if(res.isFailure()) throw res.value
              return res.value
         })
    }

    @AppGuardOptions()
    @UseGuards(...AppGuard({
        isAdminGuard: true
    }))
    @Patch("update-fireman")
    async updateSupport(
        @Req() req: Request,
        @Body() body: { fullname: string }
    ) {
        return await this.firemanService.update(req.currentUser.id, body.fullname).then(res => {
            if(res.isFailure()) throw res.value
            return res.value
        })
    }
} 
