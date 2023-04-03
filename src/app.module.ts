import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ApplicationModule } from './application/application.module';
import { AdminModule } from './admin/admin.module';
import { ApplicantModule } from './applicant/applicant.module';
import { JwtModule, JwtService } from "@nestjs/jwt";


@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ApplicationModule,
    AdminModule,
    ApplicantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
