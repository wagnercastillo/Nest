


export const fileFilter = ( req: Express.Request, file: Express.Multer.File, callBack: Function ) => {

    if( !file ) callBack( new Error('File is empty'), false )

    const fileExtension = file.mimetype.split('/')[1]
    const validExtension = ['jpg', 'png', 'jpeg', 'gif']

    if(validExtension.includes(fileExtension)) {

        return callBack(null, true)

    }
    
    callBack(null, false)

}
