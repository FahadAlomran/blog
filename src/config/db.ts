import { PrismaClient } from "@prisma/client";
import { errorMonitor } from "stream";

const prisma = new PrismaClient({
  log: ["query"],
  errorFormat: "minimal",
});

const connectDB = () => {
  try {
    
    prisma.$connect(), console.log("databaes connected !");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export { prisma, connectDB };
