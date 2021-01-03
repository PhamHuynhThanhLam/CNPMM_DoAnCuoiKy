import { Motel } from '../model/Motel';
import { NewType } from './NewType';
import { LiveType } from '../model/LiveType';

export class Detail {
    id: Int32Array;
    numberBath: Number;
    numberLiving: Number;
    director: string;
    legal: string;
    directormain:string;
    liveTypeId: string;
    liveType: LiveType;
    typeofnewId: Int32Array;
    typeofnew: NewType;
    motelid:Int32Array;
    motel:Motel;
}