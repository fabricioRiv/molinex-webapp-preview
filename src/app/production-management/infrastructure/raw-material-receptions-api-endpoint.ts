import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { RawMaterialReception } from '../domain/model/raw-material-reception.entity';
import { RawMaterialReceptionAssembler } from './raw-material-reception-assembler';
import {
  RawMaterialReceptionResource,
  RawMaterialReceptionsResponse,
} from './raw-material-receptions.response';

export class RawMaterialReceptionsApiEndpoint extends BaseApiEndpoint<
  RawMaterialReception,
  RawMaterialReceptionResource,
  RawMaterialReceptionsResponse,
  RawMaterialReceptionAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.apiBaseUrl}${environment.rawMaterialReceptionsEndpointPath}`,
      new RawMaterialReceptionAssembler(),
    );
  }
}
