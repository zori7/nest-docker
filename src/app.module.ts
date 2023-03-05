import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';

@Module({
  imports: [ProductModule, AuthModule, UserModule],
  controllers: [AppController, UserController],
  providers: [],
})
export class AppModule {}
