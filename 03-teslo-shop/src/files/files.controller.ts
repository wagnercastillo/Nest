import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException, Get, Param, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter,  fileNamer } from './helper';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('files')
export class FilesController {
  
  
  constructor(
    
    private readonly filesService: FilesService,
    private readonly configService: ConfigService

    ) {}

  @Get('product/:imageName')
  findOneProduct(

    @Res() res: Response, 
    @Param('imageName') imageName: string
    
  ) {

    const path = this.filesService.getStaticProductImage( imageName ); 

    res.sendFile( path );

  }


  @Post('product')
  @UseInterceptors( FileInterceptor('File', {

    fileFilter: fileFilter,

    storage: diskStorage({
      destination: './static/products',
      filename: fileNamer
    })

  }))  

  uploadProductImage(  
    @UploadedFile() file: Express.Multer.File ){

    if( !file ){
      throw new BadRequestException('Make sure that file is a Image')
    }  
    
    const secureUrl = `${this.configService.get('HOST_API')}/files/product/${file.filename}`
    return { secureUrl };

  }

}
