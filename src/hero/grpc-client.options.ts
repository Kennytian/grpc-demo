import { join } from 'path';
import { ClientOptions, Transport } from '@nestjs/microservices';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    // package 数组里的名字一起要跟 proto 文件里的名字对应上
    package: ['hero123'],
    protoPath: [join(__dirname, './hero.proto')],
  },
};
