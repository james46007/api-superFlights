import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassengerController } from './passenger.controller';
import { PassengerService } from './passenger.service';
import { PassengerSchema } from './schema/passenger.schema';
import { PASSENGER } from '../common/models/models';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: PASSENGER.name,
        useFactory: () => {
          return PassengerSchema;
        }
      }
    ])
  ],
  controllers: [PassengerController],
  providers: [PassengerService],
  exports: [PassengerService]
})
export class PassengerModule { }
