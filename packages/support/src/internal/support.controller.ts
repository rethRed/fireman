import { Body, Controller, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { AppGuard, AppGuardOptions } from "@common/guards";
import { SupportService } from "./support.service";

@Controller("support")
export class SupportController {

    constructor(
        private readonly supportService: SupportService
    ){}

    @AppGuardOptions()
    @UseGuards(...AppGuard({
        isAdminGuard: true
    }))
   @Post("become-support")
    async becomeSupport(
         @Req() req: Request,
         @Body() body: { fullname: string }
    ) {
         return await this.supportService.becomeSupport(req.currentUser.id, body.fullname).then(res => {
              if(res.isFailure()) throw res.value
              return res.value
         })
    }

    @AppGuardOptions()
    @UseGuards(...AppGuard({
        isAdminGuard: true
    }))
    @Patch("update-support")
    async updateSupport(
        @Req() req: Request,
        @Body() body: { fullname: string }
    ) {
        return await this.supportService.updateSupport(req.currentUser.id, body.fullname).then(res => {
            if(res.isFailure()) throw res.value
            return res.value
        })
    }
} 
