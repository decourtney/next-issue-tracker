import React from 'react'
import { Card, Flex, Heading, Text, Grid, Box, Button } from "@radix-ui/themes";
import Link from "next/link"
import { Pencil2Icon } from "@radix-ui/react-icons";

const DeleteIssueButton = ({issueId}:{issueId:number}) =>{
    return (
        <Button color="red">
          <Pencil2Icon />
          
        </Button>
    )
}

export default DeleteIssueButton