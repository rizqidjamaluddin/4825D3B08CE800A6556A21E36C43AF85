import { Entity, EntityBuilder, Type } from '@decahedron/entity';
import * as moment from 'moment';

export default class Job extends Entity {
  public id = '';
  public createdAt: moment.Moment|null = null;

  @Type(String, 'otsikko')
  public title = '';
  @Type(String, 'kuvausteksti')
  public description = '';
  @Type(String, 'tyonantajanNimi')
  public company = '';
  @Type(String, 'sijainti')
  public coordinates = '';

  @Type(String, 'kunta')
  public municipality = '';
  @Type(String, 'maakunta')
  public province = '';
  @Type(String, 'maa')
  public country = '';

  fromJson(jsonData: any): this {
    super.fromJson(jsonData);

    if ('ilmoituspaivamaara' in jsonData) {
      this.createdAt = moment(jsonData.ilmoituspaivamaara);
    }

    return this;
  }
}
