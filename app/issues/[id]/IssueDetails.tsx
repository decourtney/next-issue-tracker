import React from "react";
import { Card, Flex, Heading, Text, Box } from "@radix-ui/themes";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import ReactMarkdown from "react-markdown";
import AssigneeSelect from "./AssigneeSelect";

const IssueDetails = ({ issue }: { issue: Issue }) => {

  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex justify={"between"}>
        <Flex gap="3" my="2">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
