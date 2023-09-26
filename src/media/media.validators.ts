import * as fileType from 'file-type-mime';
import { FileValidator } from '@nestjs/common';
import { UploadTypeValidatorOPtions } from './media.types';

export class UploadProfilePicValidator extends FileValidator {
  private _allowedMimeTypes: string[];

  constructor(
    protected readonly validationOptions: UploadTypeValidatorOPtions,
  ) {
    super(validationOptions);
    this._allowedMimeTypes = validationOptions.fileType;
  }

  public isValid(file?: Express.Multer.File): boolean {
    const response = fileType.parse(file.buffer);
    try {
      return this._allowedMimeTypes.includes(response.mime);
    } catch (error) {
      return false;
    }
  }

  public buildErrorMessage(): string {
    return `Upload not allowed. Upload only files of type: ${this._allowedMimeTypes.join(
      ', ',
    )}`;
  }
}
