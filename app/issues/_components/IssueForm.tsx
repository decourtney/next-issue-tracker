"use client";

import type { Issue } from "@prisma/client";
import { ErrorMessage, Spinner } from "@/app/components";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import SimpleMDE from "react-simplemde-editor";

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({ resolver: zodResolver(issueSchema) });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);

      if (issue) await axios.patch(`/api/issues/${issue.id}`, data);
      else await axios.post("/api/issues", data);

      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setIsSubmitting(false);
      setError("An unexpected error occured.");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form className="space-y-3" onSubmit={onSubmit}>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <TextField.Root
          defaultValue={issue?.title}
          placeholder="Title"
          {...register("title")}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE
              placeholder="Description"
              {...{ ...field, ref: undefined }}
            />
          )}
        />

        <Button disabled={isSubmitting}>
          {isSubmitting && <Spinner />}
          {issue ? "Update Issue" : "Submit New Issue"}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
