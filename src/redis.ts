import { RedisAdapter } from "@grammyjs/storage-redis";
import IORedis from "ioredis";
import { REDIS_URL } from "./environment";
const redisInstance = new IORedis(REDIS_URL);

export const storage = new RedisAdapter({
    instance: redisInstance,
    ttl: 10
});
