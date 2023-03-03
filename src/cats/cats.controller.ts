import {Controller, Delete, Get, Patch, Post, Put} from '@nestjs/common';
import {CatsService} from "./cats.service";

@Controller('api/cats')
export class CatsController {
    // 서비스
    constructor(private readonly catService: CatsService) {
    }

    @Get()
    getAllCat() {
        return 'all cat';
    }

    @Get(':id')
    getCat() {
        return 'one cat';
    }

    @Post()
    createCat() {
        return '200';
    }

    @Put()
    updateCat() {
        return '200';
    }

    @Patch(':id')
    partialUpdate() {
        return '200';
    }

    @Delete(':id')
    deleteCat() {
        return '200';
    }
}
