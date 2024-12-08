import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

export default async function Home() {
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <p>Dashboard Page</p>
      </Flex>
      
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Main Page",
  description: "View a summary of the application",
};

export const dynamic = "force-dynamic";
